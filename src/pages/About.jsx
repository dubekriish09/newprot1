import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";

export default function About() {
  return <InfoPage title="A practical approach to solar" intro="Shriram Solar Solutions helps residential, commercial and industrial customers explore whether rooftop solar is right for their property.">
    <section className="feature-grid">
      <article className="feature-card"><h2>Clear estimates</h2><p>We explain the assumptions behind indicative generation, cost, savings and payback figures.</p></article>
      <article className="feature-card"><h2>Site-specific planning</h2><p>Final system recommendations should account for roof conditions, shading, load and local utility requirements.</p></article>
      <article className="feature-card"><h2>Informed decisions</h2><p>Customers should receive a written scope, equipment specifications, warranty details and payment milestones.</p></article>
    </section>
  </InfoPage>;
}
