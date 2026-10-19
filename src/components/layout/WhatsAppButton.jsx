// src/components/layout/WhatsAppButton.jsx
import React from "react";
import { SITE_CONFIG } from "../../config/site.js";

function WhatsAppButton() {
  const message = encodeURIComponent("Hello, I would like to know more about solar solutions.");
  const url = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}?text=${message}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: "var(--space-lg)",
        right: "var(--space-lg)",
        backgroundColor: "#25D366",
        color: "#fff",
        borderRadius: "50%",
        width: "56px",
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 5px rgba(0,0,0,.3)",
        zIndex: 1000,
      }}
    >
      {/* Simple WhatsApp icon */}
      <svg viewBox="0 0 32 32" width="24" height="24" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.373 3 4 8.373 4 15c0 2.637.787 5.088 2.144 7.147L4 29l7.084-2.03A11.93 11.93 0 0 0 16 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-2.13 0-4.13-.55-5.85-1.5l-.418-.245L7 25l1.271-3.637-.263-.433A8.96 8.96 0 0 1 6 15c0-4.962 4.038-9 9-9s9 4.038 9 9-4.038 9-9 9z" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
