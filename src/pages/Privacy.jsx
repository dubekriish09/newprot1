import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";

export default function Privacy() {
  return <InfoPage title="Privacy policy" intro="This starter policy explains the intended handling of information submitted through this demonstration website." cta={false}>
    <section className="policy-copy">
      <h2>Information you provide</h2><p>Enquiry forms may ask for your name, phone number, city, property type and project details so the business can respond to your request.</p>
      <h2>Current demo limitation</h2><p>This version does not send contact form submissions to a central server. If WhatsApp is configured, submitting the enquiry opens a WhatsApp message for you to review and send.</p>
      <h2>Before launch</h2><p>Replace this starter text with a reviewed policy that identifies the actual business entity, data controller contact, processors, retention period, lawful purposes and applicable user rights. Do not publish this placeholder as final legal advice.</p>
    </section>
  </InfoPage>;
}
