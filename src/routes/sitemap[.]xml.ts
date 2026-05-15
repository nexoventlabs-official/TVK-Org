import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

// Set via VITE_SITE_URL in .env — falls back to production domain.
// Google Search Console requires absolute URLs; a missing BASE_URL means
// the site will not be indexed.
const BASE_URL =
    (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_SITE_URL) ||
    "https://venkatramanan.org";

const paths = ["/", "/about", "/news", "/gallery", "/kalagam", "/assembly", "/education"];

export const Route = createFileRoute("/sitemap.xml")({
    server: {
        handlers: {
            GET: async () => {
                const urls = paths
                    .map(
                        (p) =>
                            `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq><priority>${p === "/" ? "1.0" : "0.8"}</priority></url>`,
                    )
                    .join("\n");
                const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
                return new Response(xml, {
                    headers: {
                        "Content-Type": "application/xml",
                        "Cache-Control": "public, max-age=3600",
                    },
                });
            },
        },
    },
});
