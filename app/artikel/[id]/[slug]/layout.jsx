import { getArticleBySlug } from "@/lib/api";

export async function generateMetadata(context) {
  const { slug } = await context.params;

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
    const articleUrl = `https://xyzone.media/artikel/${article.article_id}/${article.slug}`;

    // ✅ JSON-LD schema untuk NewsArticle
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": articleUrl,
      },
      "headline": article.title,
      "image": [imageUrl],
      "datePublished": article.date,
      "dateModified": article.updated_at || article.date,
      "author": {
        "@type": "Person",
        "name": article.author?.fullname || "Redaksi XYZONEMEDIA",
      },
      "publisher": {
        "@type": "Organization",
        "name": "XYZONEMEDIA",
        "logo": {
          "@type": "ImageObject",
          "url": "https://xyzone.media/logo.png", // ganti dengan logo publik asli kamu
        },
      },
      "description": article.description || article.content?.substring(0, 150) + "...",
    };

    return {
      title: `${article.title} | XYZONEMEDIA`,
      description: article.description || article.content?.substring(0, 150) + "...",
      keywords,
      openGraph: {
        title: article.title,
        description: article.description || article.content?.substring(0, 150) + "...",
        url: articleUrl,
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
        description: article.description || article.content?.substring(0, 150) + "...",
        images: [imageUrl],
      },
      other: {
        "script:ld+json": JSON.stringify(jsonLd),
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
