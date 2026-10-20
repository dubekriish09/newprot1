// Static business facts. Deliberately free of `import.meta.env` so that it can
// also be imported by vite.config.js (Node) to generate SEO files.
// VERIFY these with the client before launch.
export const BUSINESS = Object.freeze({
  name: "Shriram Solar Solutions",
  tagline: "Smarter rooftop solar for homes and businesses",
  description:
    "Explore residential, commercial and industrial solar solutions with Shriram Solar Solutions. Estimate potential savings and request a site-specific consultation.",
  address: Object.freeze({
    streetAddress:
      "A-19 RJ Puram Main Road, Purohit Market, Abhinandan Vatika, Pinto Park Road, Deen Dayal Nagar",
    addressLocality: "Gwalior",
    addressRegion: "Madhya Pradesh",
    postalCode: "474005",
    addressCountry: "IN",
  }),
});

export const formatAddress = (a = BUSINESS.address) =>
  `${a.streetAddress}, ${a.addressLocality} - ${a.postalCode}, ${a.addressRegion}, India`;
