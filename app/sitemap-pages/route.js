export async function GET() {
  const staticPages = [
    '/',
    '/entertaintment',
    '/technology',
    '/sport',
    '/c-level',
    '/lifestyle',
    '/indeks',
    '/berita-terbaru',
    '/visimisi',
    '/redaksi'
  ];

  const urls = staticPages.map((path) => `
    <url>
      <loc>https://xyzonemedia.com${path}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.5</priority>
    </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store',
    },
  });
}
