import { SITE } from "../config/site.js";
import { formatINR } from "../lib/format.js";

/** How enquiries reach the business: a form endpoint, WhatsApp, or nothing configured. */
export function getSubmissionMode(site = SITE) {
  if (site.leadEndpoint) return "endpoint";
  if (site.whatsapp) return "whatsapp";
  return "unavailable";
}

export function buildWhatsAppUrl(lead, estimate, number = SITE.whatsapp) {
  const lines = [
    `Hello ${SITE.name}, I'd like a solar consultation.`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `City / PIN: ${lead.city}`,
    `Property type: ${lead.customerType}`,
    `Monthly bill: ${lead.monthlyBill}`,
    `Message: ${lead.message || "Please contact me to discuss feasibility."}`,
  ];
  if (estimate) {
    lines.push(
      `Website estimate (illustrative only): ${estimate.recommendedKw} kW system, about ${formatINR(estimate.annualSavings)} potential annual savings.`,
    );
  }
  return `https://wa.me/${number}?text=${encodeURIComponent(lines.join("\n"))}`;
}

/**
 * POST a validated lead to the configured endpoint.
 * Resolves to { ok: true } or { ok: false, reason } - never throws.
 * Reasons: "timeout" | "network" | "server".
 */
export async function submitLead(
  lead,
  { endpoint = SITE.leadEndpoint, estimate = null, honeypot = "", fetchImpl = globalThis.fetch, timeoutMs = 10000 } = {},
) {
  // Bots fill hidden fields. Pretend success, send nothing.
  if (honeypot) return { ok: true };
  if (!endpoint) return { ok: false, reason: "network" };

  const payload = {
    ...lead,
    consent: true,
    source: SITE.url || "website",
    submittedAt: new Date().toISOString(),
    ...(estimate && {
      calculator: {
        recommendedKw: estimate.recommendedKw,
        annualSavingsInr: Math.round(estimate.annualSavings),
        installedCostInr: Math.round(estimate.installedCost),
        note: "Illustrative website estimate, not a quotation",
      },
    }),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetchImpl(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    return res.ok ? { ok: true } : { ok: false, reason: "server" };
  } catch (err) {
    return { ok: false, reason: err?.name === "AbortError" ? "timeout" : "network" };
  } finally {
    clearTimeout(timer);
  }
}
