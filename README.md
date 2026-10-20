# Shriram Solar Solutions website

Marketing site + savings estimator + lead capture for a solar installer in Gwalior, India.
React 19 · Vite 8 · no backend, no runtime secrets · deploys to any static host.

## Quick start

```bash
npm ci
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run verify` | Lint + tests + production build (run before every release) |
| `npm run build` | Production build into `dist/`. **Fails if production config is incomplete** |
| `npm run preview` | Serve `dist/` locally |
| `npm test` / `npm run lint` | Tests (Vitest) / lint incl. accessibility rules (Oxlint) |
| `npm run check:env` | Only run the configuration check |

## Configuration

Everything deployment-specific is an environment variable. No source edits are needed to go live.
All `VITE_*` values are **public** (they end up in the browser bundle) - never put secrets in them.

| Variable | Required | Purpose |
| --- | --- | --- |
| `VITE_SITE_URL` | yes | Live `https://` origin. Drives canonical URL, Open Graph, sitemap, robots, structured data |
| `VITE_LEAD_ENDPOINT` | one of these two | HTTPS URL that accepts a JSON `POST` (e.g. a [Formspree](https://formspree.io) form) |
| `VITE_WHATSAPP_NUMBER` | one of these two | Country code + number, digits only (`919876543210`) |
| `VITE_CONTACT_PHONE` / `VITE_CONTACT_EMAIL` | recommended | Shown in footer/contact section and structured data |

Business facts (name, address) live in `src/config/business.js`. Calculator numbers live in `src/calculator/assumptions.js`.

`npm run build` refuses to run if `VITE_SITE_URL` is missing/placeholder or there is no way to deliver leads, so an
unconfigured site cannot be shipped by accident. (`SKIP_ENV_CHECK=1` bypasses it for throwaway builds.)

## How enquiries work

The form validates in the browser (Indian mobile numbers are normalised to `+91…`), then:

1. **`VITE_LEAD_ENDPOINT` set** - POSTs JSON `{name, phone, city, customerType, monthlyBill, message, consent, source, submittedAt, calculator?}`
   with a 10 s timeout and clear error/retry messaging. If `VITE_WHATSAPP_NUMBER` is also set, a "message us on WhatsApp" button is offered too.
2. **Only WhatsApp set** - opens a pre-filled `wa.me` chat (the visitor still presses Send).
3. **Neither set** - the form is disabled with a message (and the build fails, see above). It no longer downloads a `.txt` file.

A hidden honeypot field silently drops most bot submissions. Add rate-limiting / spam filtering at the endpoint provider.
The calculator result is attached to a lead only if the visitor actually used the calculator.

## Project layout

```
src/
  App.jsx               page composition + hash routing (#/privacy)
  sections/             Hero, Intro, Solutions, Calculator, Approach, Projects, Coverage, Faq, Contact
  components/           Header, Footer, Brand, ErrorBoundary
  pages/Privacy.jsx     privacy notice (DRAFT - needs legal review)
  calculator/           assumptions.js (all numbers) + engine.js (pure, tested)
  services/leads.js     endpoint/WhatsApp submission
  lib/                  validation + formatting
  config/               business.js (static facts), site.js (env-driven config, image URLs)
scripts/check-env.mjs   pre-build configuration guard
vite.config.js          also generates robots.txt, sitemap.xml, CSP meta tag and _headers at build time
```

## Deploying

Build output is static (`dist/`). Set the env vars in your host's dashboard, build command `npm run build`, publish directory `dist`.

* **Netlify / Cloudflare Pages**: `dist/_headers` (generated) applies security headers and long-term caching automatically.
* **Vercel / nginx / others**: the CSP is also embedded as a `<meta>` tag so it works anywhere, but a meta tag cannot set
  `frame-ancestors` or the other headers. Copy them from `dist/_headers` into your host's header configuration.
* Serve over HTTPS only. Hash routing (`#/privacy`) needs no rewrite rules.

## Launch checklist (things only the business can supply)

- [ ] Real **phone / email / WhatsApp** and a working **lead endpoint**; submit a test enquiry and confirm it arrives
- [ ] Production **domain** set in `VITE_SITE_URL`; submit the sitemap to Google Search Console
- [ ] Confirm **cost per kW** and other estimator assumptions in `src/calculator/assumptions.js` (customers will read these as pricing)
- [ ] Verify the **address** in `src/config/business.js`
- [ ] Have the **privacy notice** (`src/pages/Privacy.jsx`) reviewed against the DPDP Act, 2023 and the actual data processor used
- [ ] Replace the Unsplash stock photos (`src/config/site.js`) and the Open Graph image (`index.html`) with the company's own; project cards are labelled "concept examples" - only change that wording for real, permissioned projects
- [ ] Validate structured data with Google's Rich Results Test; run Lighthouse on the live URL
- [ ] Add monitoring / analytics only if wanted - and then update the privacy notice and CSP
