// src/components/layout/Footer.jsx
import React from "react";
import { SITE_CONFIG } from "../../config/site.js";

function Footer() {
  return (
    <footer className="footer" style={{ backgroundColor: "var(--color-dark-section)", color: "#fff", padding: "var(--space-lg) 0" }}>
      <div className="container footer__inner" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "var(--space-md)" }}>
        <h2>{SITE_CONFIG.businessName}</h2>
        <address style={{ textAlign: "center" }}>{SITE_CONFIG.address}</address>
        <div className="footer__contacts" style={{ display: "flex", gap: "var(--space-md)" }}>
          <a href={`tel:${SITE_CONFIG.phone}`} style={{ color: "#fff" }}>Phone: {SITE_CONFIG.phone}</a>
          <a href={`mailto:${SITE_CONFIG.email}`} style={{ color: "#fff" }}>Email: {SITE_CONFIG.email}</a>
        </div>
        <a
          href={SITE_CONFIG.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "var(--space-xs) var(--space-sm)",
            backgroundColor: "var(--color-primary)",
            borderRadius: "4px",
            color: "#fff",
            textDecoration: "none",
          }}
        >
          <span style={{ marginRight: "4px" }}>📍</span> View on Google Maps
        </a>
        <p style={{ fontSize: "0.85rem", marginTop: "var(--space-sm)" }}>© {new Date().getFullYear()} {SITE_CONFIG.businessName}. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
