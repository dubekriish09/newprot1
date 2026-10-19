import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";

export default function Commercial() {
  return <InfoPage title="Solar for businesses and industry" intro="Evaluate rooftop solar for offices, shops, warehouses, institutions and industrial facilities using your load profile and operating hours.">
    <section className="feature-grid">
      <article className="feature-card"><span>01</span><h2>Commercial rooftops</h2><p>Assess daytime consumption, available roof space and the suitability of a grid-connected system.</p></article>
      <article className="feature-card"><span>02</span><h2>Industrial facilities</h2><p>Plan around connected load, demand patterns, structural capacity, safety and operational requirements.</p></article>
      <article className="feature-card"><span>03</span><h2>Business case</h2><p>Compare estimated generation, tariff assumptions, project cost and indicative payback before proceeding.</p></article>
    </section>
    <p className="notice">Commercial proposals require a review of recent bills, sanctioned load, roof structure, applicable regulations and utility policy.</p>
  </InfoPage>;
}
