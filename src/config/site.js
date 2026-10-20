import { BUSINESS, formatAddress } from "./business.js";

/**
 * Runtime configuration. Everything environment-specific comes from VITE_*
 * variables (see .env.example) so no source edit is needed to go live.
 */
const env = import.meta.env;
const digits = (v) => String(v ?? "").replace(/\D/g, "");

/** Accept only https endpoints (plus localhost for development). */
export function sanitizeEndpoint(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw);
    const isLocal = url.hostname === "localhost" || url.hostname === "127.0.0.1";
    if (url.protocol === "https:" || (isLocal && url.protocol === "http:")) return url.toString();
  } catch {
    /* fall through */
  }
  return "";
}

/** wa.me needs country code + number, digits only (E.164 allows up to 15). */
export function sanitizeWhatsApp(value) {
  const d = digits(value);
  return d.length >= 11 && d.length <= 15 ? d : "";
}

export const SITE = Object.freeze({
  ...BUSINESS,
  addressLine: formatAddress(),
  url: String(env.VITE_SITE_URL ?? "").trim().replace(/\/+$/, ""),
  phone: String(env.VITE_CONTACT_PHONE ?? "").trim(),
  email: String(env.VITE_CONTACT_EMAIL ?? "").trim(),
  whatsapp: sanitizeWhatsApp(env.VITE_WHATSAPP_NUMBER),
  leadEndpoint: sanitizeEndpoint(env.VITE_LEAD_ENDPOINT),
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(formatAddress()),
});

/** Image URLs in one place. Replace with the client's own photos when available. */
const u = (id, w) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const PHOTOS = Object.freeze({
  hero: {
    src: u("photo-1509391366360-2e959784a276", 1800),
    srcSet: [800, 1200, 1800].map((w) => `${u("photo-1509391366360-2e959784a276", w)} ${w}w`).join(", "),
    og: u("photo-1509391366360-2e959784a276", 1200),
  },
  home: u("photo-1497435334941-8c899ee9e8e9", 1000),
  commercial: u("photo-1473341304170-971dccb5ac1e", 1000),
  panels: u("photo-1508514177221-188b1cf16e9d", 1200),
});
