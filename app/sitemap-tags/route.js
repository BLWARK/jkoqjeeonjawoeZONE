export async function GET() {
  const TOTAL_TAGS = 125000;
  const PER_SITEMAP = 50000;
  const totalPages = Math.ceil(TOTAL_TAGS / PER_SITEMAP);

  const sitemapUrls = Array.from({ length: totalPages }, (_, i) => 
    `<sitemap>
       <loc>https://xyzonemedia.com/sitemap-tags/${i}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
     </sitemap>`
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapUrls.join('\n')}
    </sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store',
    },
  });
}
