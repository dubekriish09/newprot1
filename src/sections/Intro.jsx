import { Arrow } from "../components/Brand.jsx";

export default function Intro() {
  return (
    <section className="intro section-pad">
      <div className="container intro-grid">
        <div>
          <p className="eyebrow"><span /> A BETTER WAY TO GO SOLAR</p>
          <h2>
            Good solar starts
            <br />
            with <em>good decisions.</em>
          </h2>
        </div>
        <div className="intro-copy">
          <p>
            Every property uses energy differently. We help you start with the basics — your electricity bill, your roof, and
            your goals — so a solar proposal can be shaped around what actually matters to you.
          </p>
          <a className="text-link" href="#contact">Talk through your project <Arrow diagonal /></a>
        </div>
      </div>
      <div className="container value-strip">
        <div><span className="value-icon" aria-hidden="true">↗</span><b>Understand your usage</b><small>Start with the bill you already have.</small></div>
        <div><span className="value-icon" aria-hidden="true">⌂</span><b>Plan for your property</b><small>Home, workplace or industrial site.</small></div>
        <div><span className="value-icon" aria-hidden="true">☼</span><b>Know the assumptions</b><small>Clear estimates, no magic numbers.</small></div>
      </div>
    </section>
  );
}
