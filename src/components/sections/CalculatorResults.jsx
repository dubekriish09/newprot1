// src/components/sections/CalculatorResults.jsx
import React from "react";

function formatCurrency(num) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(num);
}

function CalculatorResults({ result, onQuoteClick }) {
  const { capacityKw, installationCost, monthlySaving, annualSaving, paybackYears, longTermSaving } = result;

  return (
    <div className="calculator-results" style={{ marginTop: "var(--space-lg)", textAlign: "center" }}>
      <h3>Indicative Estimate</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Recommended Capacity: <strong>{capacityKw} kW</strong></li>
        <li>Estimated Installation Cost: <strong>{formatCurrency(installationCost)}</strong></li>
        <li>Monthly Savings: <strong>{formatCurrency(monthlySaving)}</strong></li>
        <li>Annual Savings: <strong>{formatCurrency(annualSaving)}</strong></li>
        <li>Payback Period: <strong>{paybackYears} years</strong></li>
        <li>Long‑Term (25 yr) Savings: <strong>{formatCurrency(longTermSaving)}</strong></li>
      </ul>
      <button className="button button--accent" onClick={onQuoteClick} style={{ marginTop: "var(--space-md)" }}>
        Get Free Quote
      </button>
    </div>
  );
}

export default CalculatorResults;
