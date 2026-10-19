// src/components/sections/Hero.jsx
import React from "react";
import AnimatedSolar from "./AnimatedSolar.jsx";
import { SITE_CONFIG } from "../../config/site.js";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero" style={{ textAlign: "center", padding: "var(--space-xxl) var(--space-lg)" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "var(--space-md)" }}>{SITE_CONFIG.businessName}</h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "var(--space-lg)" }}>{SITE_CONFIG.tagline}</p>
      <AnimatedSolar />
      <div style={{ marginTop: "var(--space-lg)" }}>
        <Link to="/contact" className="button button--primary" style={{ marginRight: "var(--space-sm)" }}>
          Get Free Quote
        </Link>
        <Link to="/calculator" className="button button--accent">
          Calculate Savings
        </Link>
      </div>
    </section>
  );
}

export default Hero;
