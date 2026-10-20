const STEPS = [
  ["01", "⌕", "Share the basics", "Tell us your location, property type and typical electricity bill."],
  ["02", "⌂", "Assess the site", "Review roof space, shade, load profile and site-specific requirements."],
  ["03", "↗", "Review your proposal", "Compare a tailored system recommendation, costs and key assumptions."],
  ["04", "☼", "Plan the next step", "Confirm the practical details before proceeding with installation planning."],
];

export default function Approach() {
  return (
    <section className="approach section-pad" id="work">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><span /> FROM FIRST QUESTION TO SOLAR PLAN</p>
            <h2>
              A clear process.
              <br />
              <em>No guesswork.</em>
            </h2>
          </div>
          <p>Solar is a long-term decision. We believe the journey should feel considered, straightforward and transparent.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map(([num, icon, title, text]) => (
            <article key={num}>
              <span className="step-num">{num}</span>
              <div className="step-icon" aria-hidden="true">{icon}</div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
