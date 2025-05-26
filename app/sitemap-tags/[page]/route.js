export const dynamic = 'force-dynamic'; // ⬅️ WAJIB untuk dynamic API routes

export async function GET(request, context) {
  const { page } = await context.params; // ❌ SALAH

  const LIMIT = 50000;
  const allArticles = [];

  for (let p = 1; p <= 5; p++) {
    const res = await fetch(`https://api.xyzone.media/api/articles?status=publish&page=${p}&limit=100`);
    const json = await res.json();
    allArticles.push(...(json?.data || []));
  }

  const escapeXml = (unsafe) =>
    unsafe
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const tagMap = {};
  for (const article of allArticles) {
    const tags = Array.isArray(article.tags) ? article.tags : [];
    for (const tag of tags) {
      const slug = tag.toLowerCase().replace(/\s+/g, "-");
      if (!tagMap[slug] || new Date(tagMap[slug]) < new Date(article.updated_at)) {
        tagMap[slug] = article.updated_at;
      }
    }
  }

  const tagEntries = Object.entries(tagMap);
  const start = page * LIMIT;
  const end = start + LIMIT;
  const sliced = tagEntries.slice(start, end);

  const urls = sliced.map(([slug, updated]) => {
    const escapedSlug = escapeXml(encodeURIComponent(slug));
    return `
    <url>
      <loc>https://xyzone.media/tag/${escapedSlug}?platform_id=1</loc>
      <lastmod>${new Date(updated).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
  });

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
