import { getArticleBySlug } from "@/lib/api"; // ✅ Panggil langsung fungsi getArticleBySlug

export async function generateMetadata(context) {
  const { slug } = context.params;

  const normalizeImage = (url) => {
    if (!url) return "https://xyzone.media/default-image.jpg";
    return url.replace("http://156.67.217.169:9001", "https://storage.xyzone.media");
  };

  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      return {
        title: "Artikel Tidak Ditemukan | XYZONEMEDIA",
        description: "Artikel yang Anda cari tidak ditemukan.",
        robots: "noindex, follow",
      };
    }

    const keywords = Array.isArray(article.tags)
      ? article.tags.join(", ")
      : article.tags || "berita terkini, berita terbaru, informasi terkini";

    const imageUrl = normalizeImage(article.image);

    return {
      title: `${article.title} | XYZONEMEDIA`,
      description: article.description || article.content.substring(0, 150) + "...",
      keywords,
      openGraph: {
        title: article.title,
        description: article.description || article.content.substring(0, 150) + "...",
        url: `https://xyzone.media/artikel/${article.article_id}/${article.slug}`,
        images: [
          {
            url: imageUrl,
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
        description: article.description || article.content.substring(0, 150) + "...",
        images: [imageUrl],
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
