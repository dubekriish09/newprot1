import { describe, expect, it, vi } from "vitest";
import { buildWhatsAppUrl, getSubmissionMode, submitLead } from "./leads.js";

const lead = { name: "Asha Verma", phone: "+919876543210", city: "Gwalior", customerType: "Home", monthlyBill: "₹4,500–₹7,500", message: "Roof is flat & shade-free" };
const estimate = { recommendedKw: 5.3, annualSavings: 44543, installedCost: 275600 };
const ep = "https://forms.example.com/f/abc";
const ok = () => Promise.resolve({ ok: true });

describe("getSubmissionMode", () => {
  it("prefers the endpoint, then WhatsApp, else unavailable", () => {
    expect(getSubmissionMode({ leadEndpoint: ep, whatsapp: "919876543210" })).toBe("endpoint");
    expect(getSubmissionMode({ leadEndpoint: "", whatsapp: "919876543210" })).toBe("whatsapp");
    expect(getSubmissionMode({ leadEndpoint: "", whatsapp: "" })).toBe("unavailable");
  });
});

describe("buildWhatsAppUrl", () => {
  it("targets the number and url-encodes the message", () => {
    const url = buildWhatsAppUrl(lead, estimate, "919876543210");
    expect(url.startsWith("https://wa.me/919876543210?text=")).toBe(true);
    const text = decodeURIComponent(url.split("?text=")[1]);
    expect(text).toContain("Roof is flat & shade-free");
    expect(text).toContain("illustrative only");
    expect(url).not.toContain(" ");
  });
  it("omits the estimate when not provided", () => {
    expect(decodeURIComponent(buildWhatsAppUrl(lead, null, "919876543210"))).not.toContain("Website estimate");
  });
});

describe("submitLead", () => {
  it("POSTs JSON with consent and the calculator snapshot", async () => {
    const fetchImpl = vi.fn(ok);
    const res = await submitLead(lead, { endpoint: ep, estimate, fetchImpl });
    expect(res).toEqual({ ok: true });
    const [url, init] = fetchImpl.mock.calls[0];
    expect(url).toBe(ep);
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body);
    expect(body).toMatchObject({ name: "Asha Verma", consent: true, calculator: { recommendedKw: 5.3, annualSavingsInr: 44543 } });
    expect(body.submittedAt).toBeTruthy();
  });

  it("silently drops honeypot submissions without sending anything", async () => {
    const fetchImpl = vi.fn(ok);
    expect(await submitLead(lead, { endpoint: ep, honeypot: "http://spam", fetchImpl })).toEqual({ ok: true });
    expect(fetchImpl).not.toHaveBeenCalled();
  });

  it("reports server rejections", async () => {
    const fetchImpl = () => Promise.resolve({ ok: false, status: 422 });
    expect(await submitLead(lead, { endpoint: ep, fetchImpl })).toEqual({ ok: false, reason: "server" });
  });

  it("reports network failures without throwing", async () => {
    const fetchImpl = () => Promise.reject(new TypeError("Failed to fetch"));
    expect(await submitLead(lead, { endpoint: ep, fetchImpl })).toEqual({ ok: false, reason: "network" });
  });

  it("times out a hanging request", async () => {
    const fetchImpl = (_u, { signal }) =>
      new Promise((_r, reject) => signal.addEventListener("abort", () => reject(Object.assign(new Error("aborted"), { name: "AbortError" }))));
    expect(await submitLead(lead, { endpoint: ep, fetchImpl, timeoutMs: 20 })).toEqual({ ok: false, reason: "timeout" });
  });

  it("fails cleanly when no endpoint is configured", async () => {
    expect((await submitLead(lead, { endpoint: "", fetchImpl: vi.fn() })).ok).toBe(false);
  });
});
