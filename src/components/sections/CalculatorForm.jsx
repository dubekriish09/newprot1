// src/components/sections/CalculatorForm.jsx
import React, { useState } from "react";
import { calculateQuote, recommendCapacity } from "../../calculator/engine.js";
import CalculatorResults from "./CalculatorResults.jsx";
import { useNavigate } from "react-router-dom";

function CalculatorForm() {
  const [inputs, setInputs] = useState({
    monthlyBill: "",
    tariff: "",
    propertyType: "",
    city: "",
    roofArea: "",
  });
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bill = parseFloat(inputs.monthlyBill);
    if (isNaN(bill) || bill <= 0) {
      alert("Please enter a valid monthly bill amount.");
      return;
    }
    const tariff = inputs.tariff ? parseFloat(inputs.tariff) : undefined;
    const quote = calculateQuote({
      monthlyBill: bill,
      tariff,
      propertyType: inputs.propertyType,
      city: inputs.city,
      roofArea: inputs.roofArea ? parseFloat(inputs.roofArea) : undefined,
    });
    setResult({ ...quote, inputs });
  };

  const goToContact = () => {
    // Pass snapshot via query params (simpler for now)
    const params = new URLSearchParams();
    Object.entries(result.inputs).forEach(([k, v]) => params.append(k, v));
    Object.entries(result).forEach(([k, v]) => {
      if (k !== "inputs") params.append(k, v);
    });
    navigate({ pathname: "/contact", search: params.toString() });
  };

  return (
    <section className="calculator-section" style={{ padding: "var(--space-lg)" }}>
      <h2>Solar Savings Calculator</h2>
      <form onSubmit={handleSubmit} className="calculator-form" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="form-field" style={{ marginBottom: "var(--space-sm)" }}>
          <label htmlFor="monthlyBill">Monthly Electricity Bill (₹)</label>
          <input
            type="number"
            id="monthlyBill"
            name="monthlyBill"
            value={inputs.monthlyBill}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-field" style={{ marginBottom: "var(--space-sm)" }}>
          <label htmlFor="tariff">Tariff per kWh (₹) – optional</label>
          <input type="number" id="tariff" name="tariff" value={inputs.tariff} onChange={handleChange} min="0" />
        </div>
        <div className="form-field" style={{ marginBottom: "var(--space-sm)" }}>
          <label htmlFor="propertyType">Property Type</label>
          <select id="propertyType" name="propertyType" value={inputs.propertyType} onChange={handleChange}>
            <option value="">Select…</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="industrial">Industrial</option>
          </select>
        </div>
        <div className="form-field" style={{ marginBottom: "var(--space-sm)" }}>
          <label htmlFor="city">City / Location</label>
          <input type="text" id="city" name="city" value={inputs.city} onChange={handleChange} />
        </div>
        <div className="form-field" style={{ marginBottom: "var(--space-sm)" }}>
          <label htmlFor="roofArea">Roof Area (m²) – optional</label>
          <input type="number" id="roofArea" name="roofArea" value={inputs.roofArea} onChange={handleChange} min="0" />
        </div>
        <button type="submit" className="button button--primary">
          Calculate
        </button>
      </form>
      {result && (
        <CalculatorResults result={result} onQuoteClick={goToContact} />
      )}
    </section>
  );
}

export default CalculatorForm;
