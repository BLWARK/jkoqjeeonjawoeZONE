export async function GET() {
  const sitemapUrls = [
    "https://xyzone.media/sitemap-articles",
    "https://xyzone.media/sitemap-pages",
    "https://xyzone.media/sitemap-regional",
    "https://xyzone.media/sitemap-tags/0",
    "https://xyzone.media/sitemap-tags/1",
    "https://xyzone.media/sitemap-tags/2",
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapUrls
        .map(
          (url) => `
        <sitemap>
          <loc>${url}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </sitemap>`
        )
        .join("\n")}
    </sitemapindex>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "no-store",
    },
  });
}
