import headlines from "@/data/headline";
import Clevel from "@/data/cLevel";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import editorChoice from "@/data/EditorChoice";

// ✅ Gabungkan semua artikel dari berbagai sumber
const allArticles = [
  ...headlines,
  ...Clevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
  ...editorChoice,
];

export async function generateMetadata({ params }) {
  const { id, slug } = params;

  // ✅ Cari artikel berdasarkan ID dan slug
  const article = allArticles.find(
    (item) => item.id.toString() === id && item.slug === slug
  );

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | XYZONEMEDIA",
      description: "Artikel yang Anda cari tidak ditemukan.",
      robots: "noindex, follow",
    };
  }

  // ✅ Ambil keywords dari artikel (jika ada)
  const keywords = article.tags?.length
    ? article.tags.join(", ")
    : "berita terkini, berita terbaru, informasi terkini";

  return {
    title: `${article.title} | XYZONEMEDIA`,
    description: article.description || article.content.substring(0, 150) + "...",
    keywords: keywords, // ✅ Tambahkan keywords ke metadata
    openGraph: {
      title: article.title,
      description: article.description || article.content.substring(0, 150) + "...",
      url: `https://xyzonemedia.com/post/${article.id}/${article.slug}`,
      images: [
        {
          url: article.image,
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
      images: [article.image],
    },
  };
}

export default function ArticleLayout({ children }) {
  return <>{children}</>;
}
