import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";

export default function Residential() {
  return <InfoPage title="Solar that works for your home" intro="Explore rooftop solar for homes, with a clear estimate, a guided installation process, and support from enquiry to commissioning.">
    <section className="feature-grid">
      <article className="feature-card"><span>01</span><h2>Understand your usage</h2><p>Share your electricity bill and roof details to get an indicative system size and savings estimate.</p></article>
      <article className="feature-card"><span>02</span><h2>Plan your rooftop</h2><p>System design depends on usable roof area, shade, orientation, electrical load and local approvals.</p></article>
      <article className="feature-card"><span>03</span><h2>Install with confidence</h2><p>Request a site assessment and a written quotation before making an installation decision.</p></article>
    </section>
    <p className="notice">Savings and system sizing shown online are indicative only. A site survey and current electricity tariff are needed for a reliable proposal.</p>
  </InfoPage>;
}
