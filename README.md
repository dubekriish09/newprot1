# Shriram Solar Solutions — redesign starter

A responsive React + Vite website inspired by the premium visual direction of Seed Solar, adapted for an Indian residential, commercial and industrial solar audience. This is an original implementation, not a copy of Seed Solar's code, content or branding.

## Included
- Responsive mobile navigation and section-based landing page
- Residential and commercial/industrial solution cards
- Interactive solar savings estimator with editable bill, tariff and sun-hour assumptions
- Property-type filters for illustrative project categories (not real customer projects)
- OpenStreetMap overview of India; no fabricated installation pins
- Validated enquiry form with WhatsApp / Formspree configuration hooks and a local draft fallback
- FAQ accordion, accessibility focus states and reduced-motion support
- SEO title, description, Open Graph metadata, JSON-LD starter, robots.txt and sitemap.xml

## Run locally
1. Install Node.js LTS.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.
4. Run `npm run build` to create the production bundle in `dist/`.

## Must-do before client launch
1. Replace `https://YOUR-DOMAIN.example/` in `index.html`, `public/robots.txt`, and `public/sitemap.xml` with the real canonical domain.
2. In `src/App.jsx`, set `site.whatsappNumber` to the client's verified WhatsApp number (country code + number, digits only), or set `site.formspreeEndpoint` to a tested lead endpoint. Do not collect live leads until the destination is configured and tested.
3. Confirm the client's official name, service locations, phone, email, logo, credentials, warranty claims, pricing assumptions and any government-scheme wording.
4. Replace illustrative portfolio cards with verified projects or keep their explicit illustrative labels. Do not invent testimonials, installed capacity, partner logos or certifications.
5. Update the privacy notice and consent language to match the real data destination, retention policy and applicable law.
6. Consider replacing remote Unsplash images with properly licensed, optimized local images supplied by the client. Confirm usage rights and add meaningful alt text when images become content images.
7. Verify current subsidy and net-metering rules against official sources before publishing specific claims.
8. Test form delivery, keyboard navigation, mobile layouts, page speed, metadata, broken links and the production build.
9. For Cloudflare Pages, use build command `npm run build` and output directory `dist`.

## Estimate assumptions
The savings calculator is intentionally labelled illustrative. It uses a simplified generation model, an approximate ₹52,000/kW planning placeholder and 82% of estimated annual generation value as the potential bill offset. It excludes subsidy by default and does not replace a site survey, utility bill analysis, approved design or formal quotation. Tune the model using verified local pricing and assumptions before presenting it as a commercial quote.

## Lead form behavior
- If a WhatsApp number is configured, the form opens a prefilled WhatsApp message; the user must press Send.
- If a Formspree endpoint is configured, the form posts JSON to that endpoint.
- If neither is configured, it downloads a draft enquiry text file so the demo does not falsely claim that a lead was delivered.
