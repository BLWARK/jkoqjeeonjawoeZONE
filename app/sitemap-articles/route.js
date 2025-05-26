export async function GET() {
  const res = await fetch('https://api.xyzone.media/api/articles?status=publish&page=1&limit=100&sort=date&order=desc', {
    headers: {
      'Cache-Control': 'no-store',
    },
    next: {
      revalidate: 0, // force dynamic fetch
    }
  });

  const json = await res.json();
  const articles = json?.data || [];

  const urls = articles
    .filter((article) => article?.article_id && article?.slug)
    .map((article) => `
      <url>
        <loc>https://xyzone.media/artikel/${article.article_id}/${article.slug}</loc>
        <lastmod>${new Date(article.updated_at || Date.now()).toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
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
