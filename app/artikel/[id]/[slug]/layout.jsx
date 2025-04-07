import { getArticleBySlug } from "@/lib/api"; // ✅ Panggil langsung fungsi getArticleBySlug

export async function generateMetadata(context) {
  // ✅ Ambil params langsung TANPA AWAIT
  const { slug } = context.params;

  try {
    console.log(`🔥 Fetching article with slug: ${slug}`);

    // ✅ Ambil artikel langsung dari slug (pakai await karena fetching async)
    const article = await getArticleBySlug(slug);

    if (!article) {
      console.warn("⚠️ Artikel tidak ditemukan");
      return {
        title: "Artikel Tidak Ditemukan | XYZONEMEDIA",
        description: "Artikel yang Anda cari tidak ditemukan.",
        robots: "noindex, follow",
      };
    }

    // ✅ Ambil keywords dari artikel (jika ada)
    const keywords = Array.isArray(article.tags)
      ? article.tags.join(", ")
      : article.tags || "berita terkini, berita terbaru, informasi terkini";

    return {
      title: `${article.title} | XYZONEMEDIA`,
      description:
        article.description || article.content.substring(0, 150) + "...",
      keywords,
      openGraph: {
        title: article.title,
        description:
          article.description || article.content.substring(0, 150) + "...",
        url: `https://xyzonemedia.com/post/${article.article_id}/${article.slug}`,
        images: [
          {
            url: article.image
              ? `http://156.67.217.169:9001/${article.image}`
              : "/default-image.jpg",
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        type: "article",
        publishedTime: article.date,
        siteName: "XYZONEMEDIA",
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description:
          article.description || article.content.substring(0, 150) + "...",
        images: [
          article.image
            ? `http://156.67.217.169:9001/${article.image}`
            : "/default-image.jpg",
        ],
      },
    };
  } catch (error) {
    console.error("❌ Error fetching article metadata:", error);
    return {
      title: "Artikel Tidak Ditemukan | XYZONEMEDIA",
      description: "Artikel yang Anda cari tidak ditemukan.",
      robots: "noindex, follow",
    };
  }
}

export default function ArticleLayout({ children }) {
  return <>{children}</>;
}
