import React from "react";
import { Link } from "react-router-dom";
import { SITE_CONFIG } from "../../config/site.js";

export default function Footer() {
  return <footer className="site-footer">
    <div className="footer-inner">
      <div><Link to="/" className="footer-brand">{SITE_CONFIG.businessName}</Link><p>{SITE_CONFIG.tagline}</p><p className="footer-address">{SITE_CONFIG.address}</p><a href={SITE_CONFIG.googleMapsUrl} target="_blank" rel="noreferrer">View location on Google Maps ↗</a></div>
      <div><h2>Explore</h2><div className="footer-links"><Link to="/residential">Residential solar</Link><Link to="/commercial">Commercial & industrial</Link><Link to="/calculator">Savings calculator</Link><Link to="/projects">Projects</Link><Link to="/faq">FAQs</Link><Link to="/privacy">Privacy policy</Link></div></div>
      <div><h2>Enquiries</h2><p>Talk to us about your property and electricity needs.</p><Link className="button button--secondary" to="/contact">Request a quote</Link>{SITE_CONFIG.phone && <p><a href={"tel:" + SITE_CONFIG.phone}>{SITE_CONFIG.phone}</a></p>}{SITE_CONFIG.email && <p><a href={"mailto:" + SITE_CONFIG.email}>{SITE_CONFIG.email}</a></p>}</div>
    </div>
    <div className="footer-bottom">© {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved. <span>Estimates are indicative and subject to site assessment.</span></div>
  </footer>;
}
