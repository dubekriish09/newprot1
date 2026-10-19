import React from "react";
import InfoPage from "../components/sections/InfoPage.jsx";

const faqs = [
  ["How much does rooftop solar cost?", "Cost depends on system size, equipment, roof conditions, installation complexity and applicable scheme or subsidy rules. Request a site-specific quotation."],
  ["Are calculator savings guaranteed?", "No. The calculator is an early estimate based on simplified assumptions. Actual savings depend on generation, self-consumption, export compensation, tariff and system performance."],
  ["How much roof area do I need?", "Space needs vary with panel wattage, layout, access paths, shade and roof shape. A site assessment is needed to confirm usable area."],
  ["Can commercial and industrial buildings use solar?", "Often yes, but suitability depends on daytime load, roof structure, sanctioned load, utility rules and project economics."],
  ["What happens after I submit an enquiry?", "The team should review your details, clarify your requirements and arrange a site assessment before issuing a final proposal."]
];
export default function FAQ() {
  return <InfoPage title="Frequently asked questions" intro="Straightforward answers to common questions about rooftop solar and online estimates.">
    <div className="faq-list">{faqs.map(([question, answer]) => <details className="faq-item" key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </InfoPage>;
}
