import { Arrow } from "../components/Brand.jsx";
import { LIMITS } from "../calculator/assumptions.js";
import { formatINR, formatNumber } from "../lib/format.js";

function Slider({ id, label, value, display, limits, endLabels, onChange }) {
  return (
    <>
      <label className="range-label" htmlFor={id}>
        <span>{label}</span>
        <strong>{display}</strong>
      </label>
      <input
        id={id}
        type="range"
        min={limits.min}
        max={limits.max}
        step={limits.step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div className="range-ends" aria-hidden="true">
        <span>{endLabels[0]}</span>
        <span>{endLabels[1]}</span>
      </div>
    </>
  );
}

export default function Calculator({ inputs, estimate, onChange, onDiscuss }) {
  return (
    <section className="calculator-section section-pad" id="calculator">
      <div className="container calculator-layout">
        <div className="calc-copy">
          <p className="eyebrow light"><span /> YOUR FIRST SOLAR ESTIMATE</p>
          <h2>
            See what your
            <br />
            bill could <em>become.</em>
          </h2>
          <p>
            Adjust the figures to get a quick, illustrative estimate. Actual system size, generation, cost, savings and payback
            depend on your site, tariff, equipment, shade, utility rules and current incentives.
          </p>
          <div className="calc-note">
            <span aria-hidden="true">i</span>
            <span>This is an educational estimate, not a quotation or a guarantee of savings.</span>
          </div>
          <div className="sun-graphic" aria-hidden="true">
            <span className="sun-core">☼</span>
            <span className="sun-orbit orbit-one" />
            <span className="sun-orbit orbit-two" />
            <span className="sun-caption">A brighter<br />starting point</span>
          </div>
        </div>

        <div className="calc-panel">
          <div className="calc-panel-head">
            <div>
              <span className="calc-kicker">SOLAR SAVINGS ESTIMATOR</span>
              <h3>Your numbers</h3>
            </div>
            <span className="calc-live"><i /> LIVE ESTIMATE</span>
          </div>

          <Slider id="bill" label="Monthly electricity bill" value={inputs.bill} display={formatINR(inputs.bill)}
            limits={LIMITS.bill} endLabels={["₹1,000", "₹1,00,000"]} onChange={(v) => onChange("bill", v)} />
          <Slider id="tariff" label="Approx. electricity rate" value={inputs.tariff} display={`₹${inputs.tariff.toFixed(1)} / unit`}
            limits={LIMITS.tariff} endLabels={["₹4 / unit", "₹16 / unit"]} onChange={(v) => onChange("tariff", v)} />
          <Slider id="sunHours" label="Peak sun hours per day" value={inputs.sunHours} display={`${inputs.sunHours.toFixed(1)} hours`}
            limits={LIMITS.sunHours} endLabels={["3 hours", "6.5 hours"]} onChange={(v) => onChange("sunHours", v)} />

          <div className="calc-results" aria-live="polite">
            <div className="result-primary">
              <span>Potential annual bill offset*</span>
              <strong>{formatINR(estimate.annualSavings)}</strong>
              <small>
                {estimate.savingsCapped
                  ? "Limited to your current annual bill. Illustrative value."
                  : "Illustrative value based on current inputs"}
              </small>
            </div>
            <div className="result-pair">
              <div><span>Suggested system size</span><strong>{formatNumber(estimate.recommendedKw)} kW</strong></div>
              <div><span>Estimated annual generation</span><strong>{Math.round(estimate.annualGeneration).toLocaleString("en-IN")} kWh</strong></div>
              <div><span>Indicative system budget</span><strong>{formatINR(estimate.installedCost)}</strong></div>
              <div><span>Simple payback estimate</span><strong>{estimate.payback === null ? "—" : `${estimate.payback.toFixed(1)} years`}</strong></div>
            </div>
          </div>

          <a className="button button-dark full-button" href="#contact" onClick={onDiscuss}>
            Discuss this estimate <Arrow diagonal />
          </a>
          <small className="calc-disclaimer">
            *Uses a simplified generation and self-consumption assumption. Cost is a broad planning placeholder, excludes
            site-specific variations and incentives. No subsidy is included by default.
          </small>
        </div>
      </div>
    </section>
  );
}
