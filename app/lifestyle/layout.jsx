import lifestyleNews from "@/data/lifestyleNews";

export async function generateMetadata() {
  // ✅ Ambil berita utama (jika ada)
  const mainArticle = lifestyleNews[0];

  return {
    title: "Lifestyle News - Gaya Hidup, Kesehatan & Tren Terkini | XYZONEMEDIA",
    description:
      "Temukan berita terbaru tentang gaya hidup, kesehatan, tren fashion, dan inspirasi sehari-hari hanya di XYZONEMEDIA.",
    keywords:
      "berita lifestyle, gaya hidup, kesehatan, tren terbaru, inspirasi hidup, fashion, XYZONEMEDIA",
    openGraph: {
      title: "Lifestyle News - Gaya Hidup, Kesehatan & Tren Terkini | XYZONEMEDIA",
      description:
        "Temukan berita terbaru tentang gaya hidup, kesehatan, tren fashion, dan inspirasi sehari-hari hanya di XYZONEMEDIA.",
      url: "https://xyzonemedia.com/lifestyle",
      siteName: "XYZONEMEDIA",
      images: mainArticle
        ? [
            {
              url: mainArticle.image,
              width: 1200,
              height: 630,
              alt: mainArticle.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Lifestyle News - Gaya Hidup, Kesehatan & Tren Terkini | XYZONEMEDIA",
      description:
        "Temukan berita terbaru tentang gaya hidup, kesehatan, tren fashion, dan inspirasi sehari-hari hanya di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function LifestyleLayout({ children }) {
  return <>{children}</>;
}
