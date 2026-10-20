#!/usr/bin/env node
/**
 * Pre-build guard: refuse to produce a production build that would ship a
 * broken site (no way to receive enquiries, placeholder domain, etc.).
 * Runs automatically via `npm run build` (prebuild). Bypass for a throwaway
 * build with SKIP_ENV_CHECK=1.
 */
import { loadEnv } from "vite";

if (process.env.SKIP_ENV_CHECK === "1") {
  console.warn("⚠  SKIP_ENV_CHECK=1 - skipping production configuration checks.");
  process.exit(0);
}

const env = loadEnv("production", process.cwd(), "VITE_");
const errors = [];
const warnings = [];

const isHttps = (v) => { try { return new URL(v).protocol === "https:"; } catch { return false; } };

if (!isHttps(env.VITE_SITE_URL || "")) errors.push("VITE_SITE_URL must be the live https URL, e.g. https://www.example.com");
else if (/example\.|YOUR-DOMAIN/i.test(env.VITE_SITE_URL)) errors.push("VITE_SITE_URL still looks like a placeholder domain");

const wa = String(env.VITE_WHATSAPP_NUMBER || "").replace(/\D/g, "");
const hasWhatsApp = wa.length >= 11 && wa.length <= 15;
if (env.VITE_WHATSAPP_NUMBER && !hasWhatsApp) errors.push("VITE_WHATSAPP_NUMBER must be country code + number, digits only (e.g. 919876543210)");

if (env.VITE_LEAD_ENDPOINT && !isHttps(env.VITE_LEAD_ENDPOINT)) errors.push("VITE_LEAD_ENDPOINT must be an https URL");
if (!env.VITE_LEAD_ENDPOINT && !hasWhatsApp) errors.push("Set VITE_LEAD_ENDPOINT and/or VITE_WHATSAPP_NUMBER - otherwise the enquiry form cannot deliver leads");

if (!env.VITE_CONTACT_PHONE && !env.VITE_CONTACT_EMAIL) warnings.push("No VITE_CONTACT_PHONE / VITE_CONTACT_EMAIL: visitors will see no direct contact details");
if (env.VITE_LEAD_ENDPOINT && !hasWhatsApp) warnings.push("No VITE_WHATSAPP_NUMBER: the WhatsApp option will be hidden");

warnings.forEach((w) => console.warn(`⚠  ${w}`));
if (errors.length) {
  console.error("\n✖ Production configuration is incomplete:\n" + errors.map((e) => `  - ${e}`).join("\n"));
  console.error("\nSee .env.example. (Throwaway build? Use SKIP_ENV_CHECK=1)\n");
  process.exit(1);
}
console.log("✔ Production configuration looks complete.");
