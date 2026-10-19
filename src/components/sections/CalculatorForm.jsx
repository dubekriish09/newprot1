import React, { useState } from "react";
import { calculateQuote } from "../../calculator/engine.js";
import CalculatorResults from "./CalculatorResults.jsx";
import { useNavigate } from "react-router-dom";

export default function CalculatorForm() {
  const [inputs, setInputs] = useState({ monthlyBill: "", tariff: "8", propertyType: "residential", city: "", roofArea: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    try {
      const bill = Number(inputs.monthlyBill);
      const tariff = Number(inputs.tariff);
      if (!Number.isFinite(bill) || bill <= 0) throw new Error("Enter a monthly bill greater than ₹0.");
      if (!Number.isFinite(tariff) || tariff <= 0) throw new Error("Enter a tariff greater than ₹0 per unit.");
      const roofArea = inputs.roofArea === "" ? undefined : Number(inputs.roofArea);
      if (roofArea !== undefined && (!Number.isFinite(roofArea) || roofArea <= 0)) throw new Error("Roof area must be greater than zero, or left blank.");
      setResult({ ...calculateQuote({ monthlyBill: bill, tariff, propertyType: inputs.propertyType, city: inputs.city, roofArea }), inputs: { ...inputs } });
    } catch (err) {
      setResult(null);
      setError(err.message || "Please check your inputs.");
    }
  };

  const goToContact = () => {
    if (!result) return;
    const params = new URLSearchParams();
    Object.entries(result.inputs).forEach(([key, value]) => params.set(key, value));
    params.set("capacityKw", String(result.capacityKw));
    params.set("installationCost", String(result.installationCost));
    navigate({ pathname: "/contact", search: params.toString() });
  };

  return (
    <section className="calculator-section page-content" id="calculator">
      <div style={{ maxWidth: 760, margin: "0 auto 24px" }}>
        <p className="eyebrow">SOLAR SAVINGS ESTIMATOR</p>
        <h2>What could solar mean for your bill?</h2>
        <p>Start with your bill and tariff. The estimate is indicative and does not replace a site assessment.</p>
      </div>
      <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: 760, margin: "0 auto" }}>
        <div className="feature-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <label>Monthly electricity bill (₹)<input type="number" name="monthlyBill" value={inputs.monthlyBill} onChange={handleChange} required min="1" step="any" placeholder="e.g. 3000" /></label>
          <label>Tariff per unit (₹/kWh)<input type="number" name="tariff" value={inputs.tariff} onChange={handleChange} required min="0.01" step="any" /></label>
          <label>Property type<select name="propertyType" value={inputs.propertyType} onChange={handleChange}><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="industrial">Industrial</option></select></label>
          <label>City / location<input name="city" value={inputs.city} onChange={handleChange} placeholder="e.g. Gwalior" /></label>
          <label>Usable roof area (m², optional)<input type="number" name="roofArea" value={inputs.roofArea} onChange={handleChange} min="0.1" step="any" placeholder="e.g. 80" /></label>
        </div>
        <div><button type="submit" className="button button--primary">Calculate estimate</button></div>
        {error && <p role="alert" className="notice">{error}</p>}
      </form>
      {result && <CalculatorResults result={result} onQuoteClick={goToContact} />}
    </section>
  );
}
