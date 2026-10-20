import { SITE } from "../config/site.js";

const UPDATED = "20 October 2026";

/**
 * DRAFT privacy notice that describes what this site actually does with data.
 * It is not legal advice: have the business and a lawyer review it (including
 * obligations under India's Digital Personal Data Protection Act, 2023) before launch.
 */
export default function Privacy() {
  const contact = [SITE.email && `email ${SITE.email}`, SITE.phone && `phone ${SITE.phone}`].filter(Boolean).join(" or ");
  return (
    <section className="privacy-page section-pad">
      <div className="container">
        <p className="eyebrow"><span /> LEGAL</p>
        <h1>Privacy notice</h1>
        <p className="privacy-meta">Last updated {UPDATED}</p>

        <h2>Who we are</h2>
        <p>{SITE.name}, {SITE.addressLine}. {contact ? `You can reach us by ${contact}.` : "You can reach us at the address above."}</p>

        <h2>What we collect</h2>
        <p>
          Only what you type into the enquiry form: your name, phone number, city or PIN code, property type, approximate
          monthly electricity bill range and any message you add. If you used the savings estimator, we also include its
          illustrative result (system size and estimated savings) so we can discuss it with you.
        </p>

        <h2>Why we use it</h2>
        <p>To respond to your enquiry, discuss feasibility and arrange a site assessment or proposal. We do not use it for unrelated marketing and we do not sell it.</p>

        <h2>Who receives it</h2>
        <p>
          Enquiries are delivered to our team through a form-handling service we use for this purpose. If you choose to
          contact us through WhatsApp, the message is sent via WhatsApp under its own terms and privacy policy.
        </p>

        <h2>Cookies, tracking and third parties</h2>
        <p>
          This website does not set cookies or use analytics or advertising trackers. Fonts are served from this site. The
          optional location map loads from OpenStreetMap only when you press the button, and OpenStreetMap will then receive
          your IP address. Photographs are loaded from Unsplash.
        </p>

        <h2>How long we keep it</h2>
        <p>We keep enquiry details only for as long as needed to deal with your enquiry and any follow-up, and then delete them.</p>

        <h2>Your choices</h2>
        <p>
          You may ask us to tell you what we hold about you, correct it, or delete it, and you may withdraw your consent at
          any time. {contact ? `Contact us by ${contact}.` : "Contact us at the address above."}
        </p>

        <p><a href="#home" className="text-link">← Back to the website</a></p>
      </div>
    </section>
  );
}
