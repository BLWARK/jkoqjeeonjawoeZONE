import { getArticlesByTag } from "@/lib/api";

export async function generateMetadata(context) {
  const { tag } = context.params;
  const formattedTag = tag.replace(/-/g, " ");

  try {
    const articles = await getArticlesByTag(tag, 1, 1); // Ambil 1 artikel saja

    if (!articles.length) {
      return {
        title: `Tag "${formattedTag}" Tidak Ditemukan | XYZONEMEDIA`,
        description: `Tag "${formattedTag}" tidak memiliki artikel yang tersedia.`,
        robots: "noindex, follow",
      };
    }

    const featured = articles[0];
    const imageUrl = featured.image
      ? `http://156.67.217.169:9001/${featured.image}`
      : "/default-image.jpg";

    const keywords = [...new Set(featured.tags || [])].join(", ");
    const manual = `berita ${formattedTag}, informasi ${formattedTag}, topik ${formattedTag}, XYZONEMEDIA`;

    return {
      title: `Berita dengan Tag "${formattedTag}" | XYZONEMEDIA`,
      description: `Dapatkan berita terbaru dengan tag "${formattedTag}" di XYZONEMEDIA.`,
      keywords: `${manual}, ${keywords}`,
      openGraph: {
        title: `Berita dengan Tag "${formattedTag}" | XYZONEMEDIA`,
        description: `Dapatkan berita terbaru dengan tag "${formattedTag}" di XYZONEMEDIA.`,
        url: `https://xyzonemedia.com/tag/${tag}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `Gambar untuk tag ${formattedTag}`,
          },
        ],
        type: "website",
        siteName: "XYZONEMEDIA",
      },
      twitter: {
        card: "summary_large_image",
        title: `Berita dengan Tag "${formattedTag}" | XYZONEMEDIA`,
        description: `Dapatkan berita terbaru dengan tag "${formattedTag}" di XYZONEMEDIA.`,
        images: [imageUrl],
      },
    };
  } catch (error) {
    console.error("❌ Gagal fetch metadata:", error);
    return {
      title: `Tag "${formattedTag}" | XYZONEMEDIA`,
      description: `Informasi terbaru untuk tag "${formattedTag}"`,
      robots: "noindex, follow",
    };
  }
}

export default function TagLayout({ children }) {
  return <>{children}</>;
}
