export async function GET() {
  const res = await fetch('https://api.xyzone.media/api/articles?status=publish&page=1&limit=100');
  const json = await res.json();
  const articles = json?.data || [];

  const urls = articles.map((article) => {
    return `
      <url>
        <loc>https://xyzone.media/artikel/${article.article_id}/${article.slug}</loc>
        <lastmod>${article.updated_at || new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls.join('\n')}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store', // <- selalu ambil terbaru, tanpa cache
    },
  });
}
