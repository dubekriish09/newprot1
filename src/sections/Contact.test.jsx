import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "./Contact.jsx";
import * as leads from "../services/leads.js";

vi.mock("../services/leads.js", async (importOriginal) => ({ ...(await importOriginal()), submitLead: vi.fn() }));

async function fillValid(user) {
  await user.type(screen.getByLabelText(/full name/i), "Asha Verma");
  await user.type(screen.getByLabelText(/phone number/i), "98765 43210");
  await user.type(screen.getByLabelText(/city \/ pin/i), "Gwalior");
  await user.click(screen.getByRole("checkbox"));
}

describe("Contact form", () => {
  beforeEach(() => vi.clearAllMocks());

  it("blocks an empty submit, shows field errors and sends nothing", async () => {
    const user = userEvent.setup();
    render(<Contact mode="endpoint" />);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(await screen.findByText(/enter your full name|please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/valid 10-digit/i)).toBeInTheDocument();
    expect(screen.getByText(/confirm your consent/i)).toBeInTheDocument();
    expect(leads.submitLead).not.toHaveBeenCalled();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute("aria-invalid", "true");
  });

  it("submits a valid enquiry with a normalised phone and the estimate, then confirms and resets", async () => {
    leads.submitLead.mockResolvedValue({ ok: true });
    const user = userEvent.setup();
    const estimate = { recommendedKw: 5.3, annualSavings: 44543, installedCost: 275600 };
    render(<Contact mode="endpoint" estimate={estimate} />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));

    await waitFor(() => expect(leads.submitLead).toHaveBeenCalledTimes(1));
    const [values, opts] = leads.submitLead.mock.calls[0];
    expect(values).toMatchObject({ name: "Asha Verma", phone: "+919876543210", city: "Gwalior" });
    expect(opts.estimate).toBe(estimate);
    expect(await screen.findByRole("status")).toHaveTextContent(/thank you/i);
    expect(screen.getByLabelText(/full name/i)).toHaveValue("");
  });

  it("keeps the visitor's data and shows an error when sending fails", async () => {
    leads.submitLead.mockResolvedValue({ ok: false, reason: "network" });
    const user = userEvent.setup();
    render(<Contact mode="endpoint" />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /send enquiry/i }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/couldn't send/i);
    expect(screen.getByLabelText(/full name/i)).toHaveValue("Asha Verma");
  });

  it("does not offer to submit when no delivery channel is configured", () => {
    render(<Contact mode="unavailable" />);
    expect(screen.queryByRole("button", { name: /send|whatsapp/i })).not.toBeInTheDocument();
    expect(screen.getByText(/temporarily unavailable/i)).toBeInTheDocument();
  });

  it("opens WhatsApp (no network call) in whatsapp mode", async () => {
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    const user = userEvent.setup();
    render(<Contact mode="whatsapp" />);
    await fillValid(user);
    await user.click(screen.getByRole("button", { name: /continue on whatsapp/i }));
    expect(open).toHaveBeenCalledWith(expect.stringContaining("https://wa.me/"), "_blank", "noopener,noreferrer");
    expect(leads.submitLead).not.toHaveBeenCalled();
    open.mockRestore();
  });
});
