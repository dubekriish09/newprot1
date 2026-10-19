// src/components/sections/AnimatedSolar.jsx
import React from "react";
import "./AnimatedSolar.css"; // we will create a CSS file alongside

/**
 * Inline SVG that shows a simple sun with rotating rays and a subtle panel shimmer.
 * Respects `prefers-reduced-motion` – if the user prefers reduced motion the animation
 * is disabled via CSS media query.
 */
function AnimatedSolar() {
  return (
    <svg
      className="animated-solar"
      viewBox="0 0 200 200"
      aria-hidden="true"
      focusable="false"
    >
      {/* Sun core */}
      <circle cx="100" cy="100" r="30" fill="var(--color-primary)" />
      {/* Rotating rays */}
      {[...Array(8)].map((_, i) => (
        <line
          key={i}
          x1="100"
          y1="20"
          x2="100"
          y2="0"
          stroke="var(--color-primary)"
          strokeWidth="4"
          transform={`rotate(${i * 45} 100 100)`}
        />
      ))}
      {/* Panel shimmer – a rectangle with a gradient that slides */}
      <defs>
        <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="50%" stopColor="var(--color-success)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      <rect x="60" y="120" width="80" height="30" fill="var(--color-dark-section)" />
      <rect x="60" y="120" width="80" height="30" fill="url(#shimmer)" className="panel-shimmer" />
    </svg>
  );
}

export default AnimatedSolar;
