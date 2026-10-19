import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";
import { SITE_CONFIG } from "../config/site.js";

export default function Contact() {
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: "", phone: "", city: "", propertyType: "residential", message: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => {
    event.preventDefault();
    const text = [
      "Solar enquiry for Shriram Solar Solutions",
      "Name: " + form.name,
      "Phone: " + form.phone,
      "City: " + form.city,
      "Property: " + form.propertyType,
      "Details: " + (form.message || "Not provided")
    ].join("\n");
    const number = String(SITE_CONFIG.whatsapp || "").replace(/\D/g, "");
    if (number.length < 10) {
      setSent(true);
      return;
    }
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
    setSent(true);
  };
  return <InfoPage title="Let's discuss your solar project" intro="Share your contact details and project basics. The enquiry form currently prepares a WhatsApp message; connect a verified business number before launch." cta={false}>
    <div className="contact-layout">
      <form className="contact-form" onSubmit={submit}>
        <label>Name<input name="name" value={form.name} onChange={update} required autoComplete="name" /></label>
        <label>Phone number<input name="phone" type="tel" value={form.phone} onChange={update} required pattern="[0-9+() -]{10,18}" autoComplete="tel" /></label>
        <label>City / location<input name="city" value={form.city} onChange={update} required /></label>
        <label>Property type<select name="propertyType" value={form.propertyType} onChange={update}><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="industrial">Industrial</option></select></label>
        <label>Project details<textarea name="message" rows="4" value={form.message} onChange={update} placeholder="Monthly bill, roof area, or questions" /></label>
        <button className="button button--primary" type="submit">Prepare enquiry</button>
        {sent && <p className="notice" role="status">Your details are ready. If WhatsApp did not open, the business WhatsApp number still needs to be configured. This demo form does not send data to a server.</p>}
      </form>
      <aside className="contact-card"><h2>Business details</h2><p>{SITE_CONFIG.address}</p><p><strong>Phone:</strong> configure the business number before launch</p><p><strong>Email:</strong> configure the business email before launch</p><a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer">View location on Google Maps ↗</a></aside>
    </div>
  </InfoPage>;
}
