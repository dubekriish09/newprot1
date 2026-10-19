import React from "react";

function formatCurrency(num) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(num) || 0);
}

export default function CalculatorResults({ result, onQuoteClick }) {
  const { capacityKw, installationCost, monthlySaving, annualSaving, paybackYears, longTermSaving, estimateNote } = result;
  return (
    <div className="calculator-results" style={{ marginTop: "var(--space-lg)", textAlign: "left", maxWidth: 760, marginInline: "auto" }}>
      <h2>Indicative estimate</h2>
      <div className="feature-grid">
        <article className="feature-card"><span>Suggested size</span><h2>{capacityKw} kW</h2><p>Confirm with a site survey.</p></article>
        <article className="feature-card"><span>Estimated installation</span><h2>{formatCurrency(installationCost)}</h2><p>Planning placeholder, not a quotation.</p></article>
        <article className="feature-card"><span>Monthly savings</span><h2>{formatCurrency(monthlySaving)}</h2><p>Actual savings depend on usage and export rules.</p></article>
        <article className="feature-card"><span>Annual savings</span><h2>{formatCurrency(annualSaving)}</h2></article>
        <article className="feature-card"><span>Simple payback</span><h2>{paybackYears === null ? "N/A" : paybackYears + " years"}</h2></article>
        <article className="feature-card"><span>25-year net estimate</span><h2>{formatCurrency(longTermSaving)}</h2><p>Estimated gross savings minus initial cost.</p></article>
      </div>
      <p className="notice">{estimateNote}</p>
      <button className="button button--primary" onClick={onQuoteClick} style={{ marginTop: "var(--space-md)" }}>Request a detailed quote</button>
    </div>
  );
}
