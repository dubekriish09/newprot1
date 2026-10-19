// src/config/site.js
// Single source of truth for business details and placeholders

export const SITE_CONFIG = {
  businessName: "ShriRam Enterprises",
  tagline: "Solar Solutions",
  logoPath: "/public/images/logo.png", // referenced from public folder
  address: "A-19 RJ Puram Main Road, Purohit Market, Abhinandan Vatika, Pinto Park Road, Deen Dayal Nagar, Gwalior - 474005, Madhya Pradesh, India",
  phone: "PHONE_PLACEHOLDER",
  whatsapp: "WHATSAPP_PLACEHOLDER",
  email: "EMAIL_PLACEHOLDER",
  // Google Maps URL generated from address (URL‑encoded)
  get googleMapsUrl() {
    const encoded = encodeURIComponent(this.address);
    return `https://www.google.com/maps/search/?api=1&query=${encoded}`;
  },
  audience: ["residential", "commercial", "industrial"],
  primaryGoal: "generate qualified solar installation enquiries",
};
