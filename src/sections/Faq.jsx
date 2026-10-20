import { useState } from "react";
import { Arrow } from "../components/Brand.jsx";

const FAQS = [
  ["How much does a rooftop solar system cost in India?", "It depends on system capacity, equipment, roof structure, wiring, installation conditions and applicable local requirements. The calculator is a rough planning tool; a site-specific proposal is needed for a reliable price."],
  ["Will solar eliminate my electricity bill?", "Not necessarily. The result depends on your consumption pattern, system size, net-metering or other utility rules, fixed charges and how much solar power you use when it is generated."],
  ["Can I get a government subsidy?", "Some residential systems may qualify under current government programmes, subject to eligibility and official process requirements. Eligibility and current amounts must be checked on the official portal; no subsidy is assumed in this calculator."],
  ["Is solar suitable for a commercial or industrial property?", "Often it can be worth assessing where daytime electricity demand and suitable roof or land area exist. A feasibility review should consider load profiles, structure, electrical infrastructure and utility permissions."],
  ["What do you need to prepare an estimate?", "Your city or PIN code, recent electricity bill, property type, approximate roof area and any known shading or structural constraints are useful starting points."],
];

export default function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq-section section-pad" id="faq">
      <div className="container faq-layout">
        <div>
          <p className="eyebrow"><span /> GOOD QUESTIONS, CLEAR ANSWERS</p>
          <h2>
            Before you
            <br />
            <em>make the switch.</em>
          </h2>
          <p className="faq-intro">A little clarity goes a long way. Here are a few useful starting points.</p>
          <a href="#contact" className="text-link">Ask us something else <Arrow diagonal /></a>
        </div>
        <div className="faq-list">
          {FAQS.map(([q, a], i) => {
            const expanded = open === i;
            return (
              <div className={expanded ? "faq-item expanded" : "faq-item"} key={q}>
                <h3 style={{ margin: 0 }}>
                  <button type="button" className="faq-question" id={`faq-q-${i}`} aria-expanded={expanded} aria-controls={`faq-a-${i}`} onClick={() => setOpen(expanded ? -1 : i)}>
                    <span>{q}</span>
                    <b aria-hidden="true">{expanded ? "−" : "+"}</b>
                  </button>
                </h3>
                {expanded && <p className="faq-answer" id={`faq-a-${i}`}>{a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
