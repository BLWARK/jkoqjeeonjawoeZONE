export async function GET() {
  // 1. Ambil artikel terbaru
  const res = await fetch('https://api.xyzone.media/api/articles?status=publish&page=1&limit=100');
  const json = await res.json();
  const articles = json?.data || [];

  // 2. Halaman statis
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
    '/redaksi',
  ];

  // 3. Ambil daftar platform
  const platformRes = await fetch('https://api.xyzone.media/api/platforms');
  const platformJson = await platformRes.json();
  const platforms = platformJson?.data || [];

  // 4. Buat URL kategori per platform
  const regionalCategoryUrls = [];

  for (const platform of platforms) {
    const platformId = platform.platform_id;
    const platformSlug = platform.platform_name; // ✅ PAKAI LANGSUNG tanpa ubah

    // Ambil kategori untuk tiap platform
    const categoryRes = await fetch(`https://api.xyzone.media/api/categories?platform_id=${platformId}`);
    const categoryJson = await categoryRes.json();
    const categories = categoryJson?.data || [];

    for (const category of categories) {
      const categorySlug = category?.category_slug;

      if (!categorySlug) continue; // ✅ Hanya masukkan kategori valid

      regionalCategoryUrls.push(`
        <url>
          <loc>https://xyzone.media/regional/${platformSlug}/kategori/${categorySlug}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.6</priority>
        </url>`);
    }
  }

  // 5. Gabungkan semua URL
  const urls = [
    ...staticPages.map((path) => `
      <url>
        <loc>https://xyzone.media${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.5</priority>
      </url>`),

    ...articles.map((article) => `
      <url>
        <loc>https://xyzone.media/artikel/${article.article_id}/${article.slug}</loc>
        <lastmod>${article.updated_at || new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
      </url>`),

    ...regionalCategoryUrls,
  ];

  // 6. Return XML
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
