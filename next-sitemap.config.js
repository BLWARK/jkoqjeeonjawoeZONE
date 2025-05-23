/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://xyzone.media",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/login"],
  outDir: "./public",

  additionalPaths: async (config) => {
    const allArticles = [];
    const limit = 100;
    const maxPages = 2; // hanya ambil 200 artikel terbaru

    for (let page = 1; page <= maxPages; page++) {
      try {
        const res = await fetch(`https://api.xyzone.media/api/articles?status=publish&page=${page}&limit=${limit}`);
        const json = await res.json();
        const articles = json?.data || [];

        allArticles.push(...articles);
      } catch (err) {
        console.error(`❌ Error fetching page ${page}:`, err);
        break; // hentikan jika gagal agar tidak lanjut loop
      }
    }

    return allArticles.map((article) => ({
      loc: `${config.siteUrl}/artikel/${article.article_id}/${article.slug}`,
      lastmod: article.updated_at || new Date().toISOString(),
      changefreq: "daily",
      priority: 0.8,
    }));
  },
};

module.exports = config;
