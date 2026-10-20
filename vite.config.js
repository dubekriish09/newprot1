import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";
import { BUSINESS } from "./src/config/business.js";

/**
 * Generates everything that depends on the deployment domain / lead endpoint,
 * so nothing has to be hand-edited (and no "YOUR-DOMAIN.example" can ship):
 *   - canonical / og:url / JSON-LD placeholders in index.html
 *   - robots.txt and sitemap.xml
 *   - a Content-Security-Policy (<meta> works on any host) and a `_headers`
 *     file (Netlify / Cloudflare Pages) with the headers a meta tag can't set.
 */
function siteFiles(env) {
  const siteUrl = (env.VITE_SITE_URL || "").trim().replace(/\/+$/, "");
  const origin = (value) => {
    try { return new URL(value).origin; } catch { return ""; }
  };
  const endpointOrigin = origin(env.VITE_LEAD_ENDPOINT || "");

  const policy = [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://images.unsplash.com",
    "font-src 'self' data:",
    `connect-src 'self'${endpointOrigin ? ` ${endpointOrigin}` : ""}`,
    "frame-src https://www.openstreetmap.org",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: BUSINESS.name,
    description: BUSINESS.description,
    ...(siteUrl && { url: `${siteUrl}/` }),
    ...(env.VITE_CONTACT_PHONE && { telephone: env.VITE_CONTACT_PHONE }),
    ...(env.VITE_CONTACT_EMAIL && { email: env.VITE_CONTACT_EMAIL }),
    address: { "@type": "PostalAddress", ...BUSINESS.address },
    areaServed: "India",
  };

  return {
    name: "site-files",
    transformIndexHtml(html, ctx) {
      const isBuild = Boolean(ctx.bundle);
      return html
        .replaceAll("%SITE_URL%", siteUrl)
        .replace("%JSON_LD%", JSON.stringify(jsonLd).replace(/</g, "\\u003c"))
        // Dev needs inline scripts + websockets for HMR, so only enforce CSP in builds.
        .replace("%CSP_META%", isBuild ? `<meta http-equiv="Content-Security-Policy" content="${policy.join("; ")}" />` : "");
    },
    generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "robots.txt",
        source: `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\n` : ""}`,
      });
      if (siteUrl) {
        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source:
            `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
            `  <url><loc>${siteUrl}/</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`,
        });
      }
      this.emitFile({
        type: "asset",
        fileName: "_headers",
        source:
          `/*\n  Content-Security-Policy: ${[...policy, "frame-ancestors 'none'"].join("; ")}\n` +
          `  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n` +
          `  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()\n` +
          `  Strict-Transport-Security: max-age=31536000\n\n` +
          `/assets/*\n  Cache-Control: public, max-age=31536000, immutable\n`,
      });
    },
  };
}

export default defineConfig(({ mode }) => ({
  plugins: [react(), siteFiles(loadEnv(mode, process.cwd(), "VITE_"))],
  build: { sourcemap: false },
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.js"],
    css: false,
  },
}));
