export const SITE_CONFIG = {
  businessName: "Shriram Solar Solutions",
  tagline: "Smarter rooftop solar for homes and businesses",
  logoPath: "/images/logo.png",
  address: "A-19 RJ Puram Main Road, Purohit Market, Abhinandan Vatika, Pinto Park Road, Deen Dayal Nagar, Gwalior - 474005, Madhya Pradesh, India",
  // Replace these with verified business contact details before launch.
  phone: "",
  whatsapp: "",
  email: "",
  get googleMapsUrl() {
    return "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(this.address);
  },
  audience: ["residential", "commercial", "industrial"],
  primaryGoal: "generate qualified solar installation enquiries",
};
