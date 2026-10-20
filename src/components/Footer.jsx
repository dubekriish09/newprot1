import { SITE } from "../config/site.js";
import { Brand } from "./Brand.jsx";

const YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Brand />
          <p>Practical solar planning for homes, businesses and industry.</p>
        </div>
        <div className="footer-nav">
          <span>EXPLORE</span>
          <a href="#solutions">Solutions</a>
          <a href="#calculator">Savings calculator</a>
          <a href="#projects">Project types</a>
          <a href="#faq">FAQs</a>
        </div>
        <div className="footer-nav">
          <span>GET STARTED</span>
          <a href="#contact">Request a consultation</a>
          <a href="#coverage">Location explorer</a>
          <a href="#home">Back to top ↑</a>
        </div>
        <div className="footer-nav">
          <span>FIND US</span>
          {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>{SITE.phone}</a>}
          {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          <address className="footer-address">{SITE.addressLine}</address>
          <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
            View on Google Maps ↗
          </a>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {YEAR} {SITE.name}. All rights reserved.
        </span>
        <span>Illustrative estimates only, not a quotation</span>
        <a href="#/privacy">Privacy notice</a>
      </div>
    </footer>
  );
}
