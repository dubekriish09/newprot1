import React from "react";
import { Link } from "react-router-dom";

export default function InfoPage({ eyebrow = "SHRIRAM SOLAR SOLUTIONS", title, intro, children, cta = true }) {
  return (
    <div className="page-wrap">
      <section className="page-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-intro">{intro}</p>
        {cta && <div className="page-actions">
          <Link className="button button--primary" to="/calculator">Estimate my savings</Link>
          <Link className="button button--secondary" to="/contact">Talk to our team</Link>
        </div>}
      </section>
      <div className="page-content">{children}</div>
    </div>
  );
}
