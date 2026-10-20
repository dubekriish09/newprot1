import { useRef, useState } from "react";
import { Arrow } from "../components/Brand.jsx";
import { SITE } from "../config/site.js";
import { BILL_RANGES, PROPERTY_TYPES, validateLead } from "../lib/validation.js";
import { buildWhatsAppUrl, getSubmissionMode, submitLead } from "../services/leads.js";

const EMPTY = {
  name: "", phone: "", city: "", customerType: "Home", monthlyBill: BILL_RANGES[2],
  message: "", consent: false, website: "", // `website` is the honeypot
};

const FAILURE_COPY = {
  timeout: "The request took too long. Please check your connection and try again.",
  network: "We couldn't send your enquiry. Please check your connection and try again.",
  server: "Our enquiry service didn't accept the request. Please try again shortly.",
};

function Field({ id, label, error, children }) {
  return (
    <>
      <label htmlFor={id}>
        {label}
        {children}
      </label>
      {error && <p className="field-error" id={`${id}-error`} role="alert">{error}</p>}
    </>
  );
}

/**
 * @param estimate  calculator result to attach, or null if the visitor never used it
 * @param prefill   { bill } object (new object per click) to preselect the bill range
 */
export default function Contact({ estimate = null, prefill = null, mode = getSubmissionMode() }) {
  const [lead, setLead] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const formRef = useRef(null);
  const busy = status.state === "submitting";

  // Apply a new prefill (from the calculator's "Discuss this estimate") without an effect.
  const [seenPrefill, setSeenPrefill] = useState(prefill);
  if (prefill !== seenPrefill) {
    setSeenPrefill(prefill);
    if (prefill?.range) setLead((l) => ({ ...l, monthlyBill: prefill.range }));
  }

  const set = (field) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setLead((l) => ({ ...l, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };
  const a11y = (id) => ({ id, "aria-invalid": errors[id] ? "true" : undefined, "aria-describedby": errors[id] ? `${id}-error` : undefined });

  function check() {
    const result = validateLead(lead);
    setErrors(result.errors);
    if (!result.valid) {
      setStatus({ state: "idle", message: "" });
      setTimeout(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus(), 0);
      return null;
    }
    return result.values;
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (busy) return;
    const values = check();
    if (!values) return;

    if (mode === "whatsapp") {
      window.open(buildWhatsAppUrl(values, estimate), "_blank", "noopener,noreferrer");
      setStatus({ state: "success", message: "Your enquiry is ready in WhatsApp. Please press Send there to complete it." });
      return;
    }
    if (mode !== "endpoint") return;

    setStatus({ state: "submitting", message: "" });
    const result = await submitLead(values, { estimate, honeypot: lead.website });
    if (result.ok) {
      setLead(EMPTY);
      setStatus({ state: "success", message: "Thank you. Your enquiry has been received and our team will contact you." });
    } else {
      setStatus({ state: "error", message: FAILURE_COPY[result.reason] ?? FAILURE_COPY.network });
    }
  }

  function onWhatsApp() {
    const values = check();
    if (!values) return;
    window.open(buildWhatsAppUrl(values, estimate), "_blank", "noopener,noreferrer");
  }

  return (
    <section className="contact-section section-pad" id="contact">
      <div className="container contact-layout">
        <div className="contact-copy">
          <p className="eyebrow light"><span /> LET'S TALK ABOUT YOUR SITE</p>
          <h2>
            Ready to see
            <br />
            what's <em>possible?</em>
          </h2>
          <p>Tell us a little about your property. Start with a no-pressure conversation and get a clearer idea of what to explore next.</p>
          <div className="contact-assurance">
            <span aria-hidden="true">✳</span>
            <div>
              <b>Useful details, not a sales pitch.</b>
              <small>Your information is used only to respond to your enquiry. See our <a href="#/privacy" style={{ textDecoration: "underline" }}>privacy notice</a>.</small>
            </div>
          </div>
          <div className="contact-direct">
            <span>FOR RESIDENTIAL & BUSINESS ENQUIRIES</span>
            <b>One conversation can clarify the next step.</b>
            {SITE.phone && <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="contact-line">Call {SITE.phone}</a>}
            {SITE.email && <a href={`mailto:${SITE.email}`} className="contact-line">{SITE.email}</a>}
          </div>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate ref={formRef} aria-busy={busy}>
          <div className="form-heading">
            <span>START A CONVERSATION</span>
            <h3>Request a consultation</h3>
            <p>Fields marked * are required.</p>
          </div>

          {/* Honeypot: invisible to people, tempting to bots. */}
          <div className="hp" aria-hidden="true">
            <label>Leave this empty<input tabIndex={-1} autoComplete="off" value={lead.website} onChange={set("website")} /></label>
          </div>

          <div className="form-row">
            <div>
              <Field id="name" label="Full name *" error={errors.name}>
                <input {...a11y("name")} required maxLength={80} autoComplete="name" value={lead.name} onChange={set("name")} placeholder="Your name" />
              </Field>
            </div>
            <div>
              <Field id="phone" label="Phone number *" error={errors.phone}>
                <input {...a11y("phone")} required type="tel" inputMode="tel" autoComplete="tel" value={lead.phone} onChange={set("phone")} placeholder="+91 98765 43210" />
              </Field>
            </div>
          </div>
          <div className="form-row">
            <div>
              <Field id="city" label="City / PIN code *" error={errors.city}>
                <input {...a11y("city")} required maxLength={80} autoComplete="postal-code" value={lead.city} onChange={set("city")} placeholder="Where is the property?" />
              </Field>
            </div>
            <div>
              <Field id="customerType" label="Property type" error={errors.customerType}>
                <select {...a11y("customerType")} value={lead.customerType} onChange={set("customerType")}>
                  {PROPERTY_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
            </div>
          </div>
          <Field id="monthlyBill" label="Typical monthly electricity bill" error={errors.monthlyBill}>
            <select {...a11y("monthlyBill")} value={lead.monthlyBill} onChange={set("monthlyBill")}>
              {BILL_RANGES.map((r) => <option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field id="message" label="Anything else we should know?" error={errors.message}>
            <textarea {...a11y("message")} rows="3" maxLength={1000} value={lead.message} onChange={set("message")} placeholder="Roof type, approximate size, goals… (optional)" />
          </Field>

          <label className="consent" htmlFor="consent">
            <input {...a11y("consent")} type="checkbox" checked={lead.consent} onChange={set("consent")} />
            <span>
              I agree to be contacted about this enquiry and to my details being handled as described in the{" "}
              <a href="#/privacy" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>privacy notice</a>. *
            </span>
          </label>
          {errors.consent && <p className="field-error" id="consent-error" role="alert">{errors.consent}</p>}

          {mode === "unavailable" ? (
            <p className="form-status error" role="alert">
              Online enquiries are temporarily unavailable.{" "}
              {SITE.phone || SITE.email ? "Please contact us directly using the details shown on this page." : "Please check back soon."}
            </p>
          ) : (
            <>
              <button className="button button-lime full-button" type="submit" disabled={busy}>
                {busy ? "Sending…" : mode === "whatsapp" ? "Continue on WhatsApp" : "Send enquiry"} <Arrow diagonal />
              </button>
              {mode === "endpoint" && SITE.whatsapp && (
                <button className="button button-dark full-button" type="button" onClick={onWhatsApp} disabled={busy}>
                  Or message us on WhatsApp <Arrow diagonal />
                </button>
              )}
            </>
          )}

          {status.message && (
            <p className={status.state === "error" ? "form-status error" : "form-status"} role={status.state === "error" ? "alert" : "status"}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
