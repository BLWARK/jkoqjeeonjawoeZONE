/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://xyzone.media",
  generateRobotsTxt: true,
  changefreq: "daily",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin", "/login"],
  outDir: "./public",

  // ⬇️ Tambahkan artikel dynamic ke sitemap
  additionalPaths: async (config) => {
  const res = await fetch("https://api.xyzone.media/articles");
  const json = await res.json();
  const articles = json.data || []; // ✅ sesuaikan path array-nya

  return articles.map((article) => ({
    loc: `${config.siteUrl}/artikel/${article.article_id}/${article.slug}`,
    lastmod: article.updated_at || new Date().toISOString(),
    changefreq: "daily",
    priority: 0.8,
  }));
  },
};

module.exports = config;
