import React, { useMemo, useState } from "react";
import "./App.css";

const site = {
  name: "Shriram Solar Solutions",
  whatsappNumber: "", // Add country code + number only, e.g. 919876543210
  email: "", // Add the client's verified business email before launch
  phone: "", // Add the client's verified business phone before launch
  serviceArea: "India",
  formspreeEndpoint: "", // Optional: add a verified Formspree endpoint for email-backed leads
};

const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
const photos = {
  hero: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1800&q=85",
  home: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1000&q=80",
  commercial: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1000&q=80",
  panels: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80",
  field: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1000&q=80",
};

function Arrow({ diagonal = false }) { return <span aria-hidden="true">{diagonal ? "↗" : "→"}</span>; }
function Brand() { return <a className="brand" href="#home" aria-label="Shriram Solar Solutions home"><span className="brand-mark">S<span>☼</span></span><span className="brand-name">shriram<span>solar solutions</span></span></a>; }

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bill, setBill] = useState(4500);
  const [tariff, setTariff] = useState(8);
  const [sunHours, setSunHours] = useState(4.5);
  const [lead, setLead] = useState({ name: "", phone: "", city: "", customerType: "Home", monthlyBill: "₹4,500–₹7,500", message: "" });
  const [formStatus, setFormStatus] = useState("");
  const [faqOpen, setFaqOpen] = useState(0);
  const [projectType, setProjectType] = useState("All");

  const estimate = useMemo(() => {
    const monthlyUnits = Math.max(0, bill / Math.max(1, tariff));
    const recommendedKw = Math.max(1, Math.min(500, Math.round((monthlyUnits / 30 / Math.max(1, sunHours) / 0.78) * 10) / 10));
    const dailyGeneration = recommendedKw * sunHours * 0.78;
    const annualGeneration = dailyGeneration * 365;
    const annualSavings = annualGeneration * tariff * 0.82;
    const installedCost = recommendedKw * 52000;
    const payback = annualSavings > 0 ? installedCost / annualSavings : 0;
    return { monthlyUnits, recommendedKw, dailyGeneration, annualGeneration, annualSavings, installedCost, payback };
  }, [bill, tariff, sunHours]);

  const projects = [
    { type: "Residential", title: "Independent home rooftop", size: "Concept example · 3–5 kW", image: photos.home, text: "A rooftop system designed around household usage, roof orientation and available shadow-free space." },
    { type: "Commercial", title: "Commercial rooftop", size: "Concept example · 20–100 kW", image: photos.commercial, text: "A business-focused solar layout intended to offset daytime electricity demand." },
    { type: "Industrial", title: "Industrial roof assessment", size: "Concept example · 100 kW+", image: photos.panels, text: "A larger-site feasibility workflow that considers roof structure, load profile and electrical infrastructure." },
  ];
  const visibleProjects = projectType === "All" ? projects : projects.filter(p => p.type === projectType);

  function sendLead(e) {
    e.preventDefault();
    setFormStatus("");
    const payload = { ...lead, estimate: money(estimate.annualSavings) + " estimated annual savings", submittedAt: new Date().toISOString(), source: "Shriram Solar website" };
    const message = `Hello Shriram Solar Solutions, I'd like a solar consultation.\nName: ${payload.name}\nPhone: ${payload.phone}\nCity: ${payload.city}\nCustomer type: ${payload.customerType}\nMonthly bill: ${payload.monthlyBill}\nMessage: ${payload.message || "Please contact me to discuss feasibility."}\nWebsite calculator estimate: ${payload.estimate} (illustrative only)`;
    if (site.whatsappNumber) {
      window.open("https://wa.me/" + site.whatsappNumber.replace(/\D/g, "") + "?text=" + encodeURIComponent(message), "_blank", "noopener,noreferrer");
      setFormStatus("Your enquiry is ready in WhatsApp. Please press Send in WhatsApp to submit it.");
      return;
    }
    if (site.formspreeEndpoint) {
      fetch(site.formspreeEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) })
        .then(r => { if (!r.ok) throw new Error("Could not send"); setFormStatus("Thanks — your enquiry has been submitted."); setLead({ name: "", phone: "", city: "", customerType: "Home", monthlyBill: "₹4,500–₹7,500", message: "" }); })
        .catch(() => setFormStatus("The enquiry could not be sent. Please configure and test the lead endpoint before launch."));
      return;
    }
    const blob = new Blob([message], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "shriram-solar-enquiry.txt"; a.click(); URL.revokeObjectURL(url);
    setFormStatus("A draft enquiry file was downloaded. Add the client's verified WhatsApp number or lead endpoint in src/App.jsx before production.");
  }

  return (
    <div className="site-shell">
      <div className="topline"><span><i className="status-dot" /> Solar solutions for homes, businesses & industry</span><span>Designed for India's sunshine <b>✳</b></span></div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Brand />
          <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
          <nav className={menuOpen ? "nav-links open" : "nav-links"} aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
            <a href="#solutions">Solutions</a><a href="#calculator">Savings calculator</a><a href="#work">Our approach</a><a href="#coverage">Coverage</a>
            <a className="nav-cta" href="#contact">Get a consultation <Arrow diagonal /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-image" role="img" aria-label="Solar panels catching sunlight on a rooftop" style={{ backgroundImage: `url(${photos.hero})` }} />
          <div className="hero-shade" />
          <div className="container hero-content">
            <p className="eyebrow light"><span /> SOLAR, MADE MORE PRACTICAL</p>
            <h1>Make your roof<br />work <em>for you.</em></h1>
            <p className="hero-copy">Thoughtfully planned solar for Indian homes and businesses. Understand your potential savings, explore the right system, and take the next step with confidence.</p>
            <div className="hero-actions"><a className="button button-lime" href="#calculator">Estimate my savings <Arrow diagonal /></a><a className="button button-glass" href="#solutions">Explore solutions <Arrow /></a></div>
            <div className="hero-foot"><span>01 / 03</span><span className="hero-line" /><span>Residential · Commercial · Industrial</span></div>
          </div>
          <div className="hero-stamp"><span>POWERED BY</span><strong>THE SUN</strong><span className="stamp-sun">☼</span></div>
        </section>

        <section className="intro section-pad">
          <div className="container intro-grid">
            <div><p className="eyebrow"><span /> A BETTER WAY TO GO SOLAR</p><h2>Good solar starts<br />with <em>good decisions.</em></h2></div>
            <div className="intro-copy"><p>Every property uses energy differently. We help you start with the basics — your electricity bill, your roof, and your goals — so a solar proposal can be shaped around what actually matters to you.</p><a className="text-link" href="#contact">Talk through your project <Arrow diagonal /></a></div>
          </div>
          <div className="container value-strip"><div><span className="value-icon">↗</span><b>Understand your usage</b><small>Start with the bill you already have.</small></div><div><span className="value-icon">⌂</span><b>Plan for your property</b><small>Home, workplace or industrial site.</small></div><div><span className="value-icon">☼</span><b>Know the assumptions</b><small>Clear estimates, no magic numbers.</small></div></div>
        </section>

        <section className="solutions section-pad" id="solutions">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow"><span /> SOLUTIONS FOR YOUR SPACE</p><h2>One sun. Different<br /><em>ways to use it.</em></h2></div><p>From the family home to a high-consumption facility, the right system starts with the way you use power.</p></div>
            <div className="solution-grid">
              <article className="solution-card solution-home"><div className="solution-photo" style={{ backgroundImage: `url(${photos.home})` }} /><div className="solution-body"><span className="card-index">01 / HOME</span><h3>Residential solar</h3><p>Turn available rooftop space into a practical way to manage household electricity costs.</p><ul><li>Rooftop feasibility</li><li>Usage-based system sizing</li><li>Guidance on next steps and applicable schemes</li></ul><a href="#contact" className="round-link" aria-label="Enquire about residential solar"><Arrow diagonal /></a></div></article>
              <article className="solution-card solution-business"><div className="solution-photo" style={{ backgroundImage: `url(${photos.commercial})` }} /><div className="solution-body"><span className="card-index">02 / BUSINESS</span><h3>Commercial & industrial</h3><p>Explore solar for offices, shops, warehouses and facilities with daytime power demand.</p><ul><li>Load-profile assessment</li><li>Rooftop and site planning</li><li>Cost and payback modelling</li></ul><a href="#contact" className="round-link" aria-label="Enquire about commercial solar"><Arrow diagonal /></a></div></article>
            </div>
          </div>
        </section>

        <section className="calculator-section section-pad" id="calculator">
          <div className="container calculator-layout">
            <div className="calc-copy"><p className="eyebrow light"><span /> YOUR FIRST SOLAR ESTIMATE</p><h2>See what your<br />bill could <em>become.</em></h2><p>Adjust the figures to get a quick, illustrative estimate. Actual system size, generation, cost, savings and payback depend on your site, tariff, equipment, shade, utility rules and current incentives.</p><div className="calc-note"><span>i</span><span>This is an educational estimate, not a quotation or a guarantee of savings.</span></div><div className="sun-graphic" aria-hidden="true"><span className="sun-core">☼</span><span className="sun-orbit orbit-one" /><span className="sun-orbit orbit-two" /><span className="sun-caption">A brighter<br />starting point</span></div></div>
            <div className="calc-panel">
              <div className="calc-panel-head"><div><span className="calc-kicker">SOLAR SAVINGS ESTIMATOR</span><h3>Your numbers</h3></div><span className="calc-live"><i /> LIVE ESTIMATE</span></div>
              <label className="range-label" htmlFor="bill"><span>Monthly electricity bill</span><strong>{money(bill)}</strong></label><input id="bill" type="range" min="1000" max="100000" step="500" value={bill} onChange={e => setBill(Number(e.target.value))} /><div className="range-ends"><span>₹1,000</span><span>₹1,00,000</span></div>
              <label className="range-label" htmlFor="tariff"><span>Approx. electricity rate</span><strong>₹{tariff.toFixed(1)} / unit</strong></label><input id="tariff" type="range" min="4" max="16" step=".5" value={tariff} onChange={e => setTariff(Number(e.target.value))} /><div className="range-ends"><span>₹4 / unit</span><span>₹16 / unit</span></div>
              <label className="range-label" htmlFor="sunHours"><span>Peak sun hours per day</span><strong>{sunHours.toFixed(1)} hours</strong></label><input id="sunHours" type="range" min="3" max="6.5" step=".5" value={sunHours} onChange={e => setSunHours(Number(e.target.value))} /><div className="range-ends"><span>3 hours</span><span>6.5 hours</span></div>
              <div className="calc-results"><div className="result-primary"><span>Potential annual bill offset*</span><strong>{money(estimate.annualSavings)}</strong><small>Illustrative value based on current inputs</small></div><div className="result-pair"><div><span>Suggested system size</span><strong>{estimate.recommendedKw.toLocaleString("en-IN",{maximumFractionDigits:1})} kW</strong></div><div><span>Estimated annual generation</span><strong>{Math.round(estimate.annualGeneration).toLocaleString("en-IN")} kWh</strong></div><div><span>Indicative system budget</span><strong>{money(estimate.installedCost)}</strong></div><div><span>Simple payback estimate</span><strong>{estimate.payback.toFixed(1)} years</strong></div></div></div>
              <a className="button button-dark full-button" href="#contact" onClick={() => setLead(l => ({ ...l, monthlyBill: money(bill) }))}>Discuss this estimate <Arrow diagonal /></a>
              <small className="calc-disclaimer">*Uses a simplified generation and self-consumption assumption. Cost is a broad planning placeholder, excludes site-specific variations and incentives. No subsidy is included by default.</small>
            </div>
          </div>
        </section>

        <section className="approach section-pad" id="work">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow"><span /> FROM FIRST QUESTION TO SOLAR PLAN</p><h2>A clear process.<br /><em>No guesswork.</em></h2></div><p>Solar is a long-term decision. We believe the journey should feel considered, straightforward and transparent.</p></div>
            <div className="steps-grid"><article><span className="step-num">01</span><div className="step-icon">⌕</div><h3>Share the basics</h3><p>Tell us your location, property type and typical electricity bill.</p></article><article><span className="step-num">02</span><div className="step-icon">⌂</div><h3>Assess the site</h3><p>Review roof space, shade, load profile and site-specific requirements.</p></article><article><span className="step-num">03</span><div className="step-icon">↗</div><h3>Review your proposal</h3><p>Compare a tailored system recommendation, costs and key assumptions.</p></article><article><span className="step-num">04</span><div className="step-icon">☼</div><h3>Plan the next step</h3><p>Confirm the practical details before proceeding with installation planning.</p></article></div>
          </div>
        </section>

        <section className="work-section section-pad" id="projects">
          <div className="container">
            <div className="section-heading"><div><p className="eyebrow"><span /> PLANNING FOR DIFFERENT SITES</p><h2>Built around the<br /><em>place it powers.</em></h2></div><div className="work-heading-right"><p>Explore the kinds of properties we can assess. These are illustrative design examples, not claimed completed installations.</p><div className="filter-tabs" role="group" aria-label="Filter property types">{["All","Residential","Commercial","Industrial"].map(t => <button key={t} className={projectType === t ? "filter active" : "filter"} onClick={() => setProjectType(t)}>{t}</button>)}</div></div></div>
            <div className="project-grid">{visibleProjects.map((p,i) => <article className="project-card" key={p.title}><div className="project-image" style={{ backgroundImage: `url(${p.image})` }}><span>{String(i+1).padStart(2,"0")}</span><span className="project-arrow"><Arrow diagonal /></span></div><div className="project-info"><span className="project-type">{p.type} · {p.size}</span><h3>{p.title}</h3><p>{p.text}</p><a href="#contact" className="text-link">Discuss a similar site <Arrow diagonal /></a></div></article>)}</div>
          </div>
        </section>

        <section className="coverage section-pad" id="coverage">
          <div className="container coverage-layout">
            <div className="coverage-copy"><p className="eyebrow"><span /> LOCAL KNOWLEDGE MATTERS</p><h2>Solar starts<br />with <em>your location.</em></h2><p>Sunlight, local utility rules, roof conditions and installation logistics vary by region. Share your city or PIN code and we'll use it as the starting point for a serviceability discussion.</p><div className="coverage-points"><span><b>01</b> Location-first assessment</span><span><b>02</b> Site and roof suitability</span><span><b>03</b> Local rules checked during proposal</span></div><a className="button button-dark" href="#contact">Check my location <Arrow diagonal /></a></div>
            <div className="map-card"><div className="map-top"><div><span className="map-overline">LOCATION EXPLORER</span><h3>Start with your area</h3></div><span className="map-pin">⌖</span></div><div className="map-frame"><iframe title="OpenStreetMap overview of India" src="https://www.openstreetmap.org/export/embed.html?bbox=68.1%2C6.4%2C97.5%2C35.8&layer=mapnik" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><div className="map-bottom"><span><i className="map-dot" /> India overview · illustrative only</span><a href="https://www.openstreetmap.org/#map=5/22.5/79.0" target="_blank" rel="noreferrer">Explore map <Arrow diagonal /></a></div><p className="map-disclaimer">This map does not show verified project locations or confirm service availability. Coverage must be confirmed with the Shriram team.</p></div>
          </div>
        </section>

        <section className="faq-section section-pad" id="faq">
          <div className="container faq-layout"><div><p className="eyebrow"><span /> GOOD QUESTIONS, CLEAR ANSWERS</p><h2>Before you<br /><em>make the switch.</em></h2><p className="faq-intro">A little clarity goes a long way. Here are a few useful starting points.</p><a href="#contact" className="text-link">Ask us something else <Arrow diagonal /></a></div><div className="faq-list">{[
            ["How much does a rooftop solar system cost in India?","It depends on system capacity, equipment, roof structure, wiring, installation conditions and applicable local requirements. The calculator is a rough planning tool; a site-specific proposal is needed for a reliable price."],
            ["Will solar eliminate my electricity bill?","Not necessarily. The result depends on your consumption pattern, system size, net-metering or other utility rules, fixed charges and how much solar power you use when it is generated."],
            ["Can I get a government subsidy?","Some residential systems may qualify under current government programmes, subject to eligibility and official process requirements. Eligibility and current amounts must be checked on the official portal; no subsidy is assumed in this calculator."],
            ["Is solar suitable for a commercial or industrial property?","Often it can be worth assessing where daytime electricity demand and suitable roof or land area exist. A feasibility review should consider load profiles, structure, electrical infrastructure and utility permissions."],
            ["What do you need to prepare an estimate?","Your city or PIN code, recent electricity bill, property type, approximate roof area and any known shading or structural constraints are useful starting points."]
          ].map(([q,a],i)=><div className={faqOpen===i?"faq-item expanded":"faq-item"} key={q}><button className="faq-question" aria-expanded={faqOpen===i} onClick={() => setFaqOpen(faqOpen===i?-1:i)}><span>{q}</span><b>{faqOpen===i?"−":"+"}</b></button>{faqOpen===i&&<p className="faq-answer">{a}</p>}</div>)}</div></div>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy"><p className="eyebrow light"><span /> LET'S TALK ABOUT YOUR SITE</p><h2>Ready to see<br />what's <em>possible?</em></h2><p>Tell us a little about your property. Start with a no-pressure conversation and get a clearer idea of what to explore next.</p><div className="contact-assurance"><span>✳</span><div><b>Useful details, not a sales pitch.</b><small>Your information should only be used to respond to your enquiry. Configure the live privacy and data-handling process before launch.</small></div></div><div className="contact-direct"><span>FOR RESIDENTIAL & BUSINESS ENQUIRIES</span><b>One conversation can clarify the next step.</b></div></div>
            <form className="contact-form" onSubmit={sendLead}>
              <div className="form-heading"><span>START A CONVERSATION</span><h3>Request a consultation</h3><p>Fields marked * are required.</p></div>
              <div className="form-row"><label>Full name *<input required minLength="2" autoComplete="name" value={lead.name} onChange={e=>setLead({...lead,name:e.target.value})} placeholder="Your name" /></label><label>Phone number *<input required type="tel" pattern="[0-9+()\-\s]{8,18}" autoComplete="tel" value={lead.phone} onChange={e=>setLead({...lead,phone:e.target.value})} placeholder="+91 98765 43210" /></label></div>
              <div className="form-row"><label>City / PIN code *<input required autoComplete="postal-code" value={lead.city} onChange={e=>setLead({...lead,city:e.target.value})} placeholder="Where is the property?" /></label><label>Property type<select value={lead.customerType} onChange={e=>setLead({...lead,customerType:e.target.value})}><option>Home</option><option>Commercial</option><option>Industrial</option><option>Other</option></select></label></div>
              <label>Typical monthly electricity bill<select value={lead.monthlyBill} onChange={e=>setLead({...lead,monthlyBill:e.target.value})}><option>Under ₹2,000</option><option>₹2,000–₹4,500</option><option>₹4,500–₹7,500</option><option>₹7,500–₹15,000</option><option>₹15,000–₹50,000</option><option>Above ₹50,000</option><option>Not sure</option></select></label>
              <label>Anything else we should know?<textarea rows="3" value={lead.message} onChange={e=>setLead({...lead,message:e.target.value})} placeholder="Roof type, approximate size, goals… (optional)" /></label>
              <label className="consent"><input required type="checkbox" /> <span>I agree to be contacted about this enquiry and understand that my details should be handled according to the site's privacy policy.</span></label>
              <button className="button button-lime full-button" type="submit">Prepare my enquiry <Arrow diagonal /></button>
              {formStatus && <p className="form-status" role="status">{formStatus}</p>}
              <small className="form-footnote">Before production, connect the form to a verified lead endpoint or the client's WhatsApp number. Do not collect real customer data on an unconfigured demo.</small>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-main"><div className="footer-brand"><Brand /><p>Practical solar planning for homes, businesses and industry.</p></div><div className="footer-nav"><span>EXPLORE</span><a href="#solutions">Solutions</a><a href="#calculator">Savings calculator</a><a href="#projects">Project types</a><a href="#faq">FAQs</a></div><div className="footer-nav"><span>GET STARTED</span><a href="#contact">Request a consultation</a><a href="#coverage">Location explorer</a><a href="#home">Back to top ↑</a></div><div className="footer-note"><span>BUILT FOR A BRIGHTER EVERYDAY</span><div className="footer-sun">☼</div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Shriram Solar Solutions. All rights reserved.</span><span>Illustrative estimates only · Company details to be verified before launch</span><a href="#privacy">Privacy note</a></div><div id="privacy" className="container privacy-note">Privacy note: this starter site does not include a production lead database. Configure a secure lead destination, final privacy notice, retention policy and consent wording before collecting customer information.</div></footer>
      <a className="floating-contact" href="#contact" aria-label="Request a solar consultation"><span>↗</span><b>Let's talk solar</b></a>
    </div>
  );
}

export default App;
