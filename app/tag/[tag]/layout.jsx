import headlines from "@/data/headline";
import cLevel from "@/data/cLevel";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";

// ✅ Gabungkan semua artikel dari berbagai sumber
const allArticles = [
  ...cLevel,
  ...headlines,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

export async function generateMetadata({ params }) {
  const { tag } = params;
  const formattedTag = tag.replace("-", " ");

  // ✅ Cari artikel yang memiliki tag yang sesuai
  const articlesWithTag = allArticles.filter((article) =>
    article.tags?.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
  );

  if (!articlesWithTag.length) {
    return {
      title: `Tag "${formattedTag}" Tidak Ditemukan | XYZONEMEDIA`,
      description: `Tag "${formattedTag}" tidak memiliki artikel yang tersedia.`,
      robots: "noindex, follow",
    };
  }

  // ✅ Ambil artikel terbaru untuk gambar utama
  const featuredArticle = articlesWithTag[0];

  // ✅ Ambil semua keyword unik dari artikel dengan tag tersebut
  const uniqueKeywords = [
    ...new Set(
      articlesWithTag.flatMap((article) => article.tags || [])
    ),
  ]
    .slice(0, 10) // Batasi agar tidak terlalu panjang
    .join(", "); // Gabungkan keyword menjadi string

  // ✅ Tambahkan keyword manual untuk optimasi SEO
  const manualKeywords = `berita ${formattedTag}, informasi ${formattedTag}, topik ${formattedTag}, XYZONEMEDIA`;

  return {
    title: `Berita dengan Tag "${formattedTag}" | XYZONEMEDIA`,
    description: `Dapatkan berita terbaru dengan tag "${formattedTag}" di XYZONEMEDIA.`,
    keywords: `${manualKeywords}, ${uniqueKeywords}`,
    openGraph: {
      title: `Berita dengan Tag "${formattedTag}" | XYZONEMEDIA`,
      description: `Dapatkan berita terbaru dengan tag "${formattedTag}" di XYZONEMEDIA.`,
      url: `https://xyzonemedia.com/tag/${tag}`,
      images: [
        {
          url: featuredArticle.image,
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
      images: [featuredArticle.image],
    },
  };
}

export default function TagLayout({ children }) {
  return <>{children}</>;
}
