export async function GET() {
  const platformRes = await fetch('https://api.xyzone.media/api/platforms');
  const platformJson = await platformRes.json();
  const platforms = platformJson?.data || [];

  const urls = [];

  for (const platform of platforms) {
    const platformId = platform.platform_id;
    const platformSlug = platform.platform_name;

    const categoryRes = await fetch(`https://api.xyzone.media/api/categories?platform_id=${platformId}`);
    const categoryJson = await categoryRes.json();
    const categories = categoryJson?.data || [];

    for (const category of categories) {
      const categorySlug = category?.category_slug;
      if (!categorySlug) continue;

      urls.push(`
        <url>
          <loc>https://xyzone.media/regional/${platformSlug}/kategori/${categorySlug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>`);
    }
  }

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
