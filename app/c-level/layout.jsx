import cLevelNews from "@/data/cLevel";

export async function generateMetadata() {
  // ✅ Ambil berita utama (jika ada)
  const mainArticle = cLevelNews[0];

  return {
    title: "C-Level News - Berita Eksekutif, CEO, dan Pemimpin Bisnis | XYZONEMEDIA",
    description: "Dapatkan berita terbaru seputar eksekutif, CEO, dan pemimpin bisnis di dunia industri dan teknologi hanya di XYZONEMEDIA.",
    keywords: "C-Level, CEO, eksekutif, berita bisnis, pemimpin industri, XYZONEMEDIA",
    openGraph: {
      title: "C-Level News - Berita Eksekutif, CEO, dan Pemimpin Bisnis | XYZONEMEDIA",
      description: "Dapatkan berita terbaru seputar eksekutif, CEO, dan pemimpin bisnis di dunia industri dan teknologi hanya di XYZONEMEDIA.",
      url: "https://xyzonemedia.com/c-level",
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
      title: "C-Level News - Berita Eksekutif, CEO, dan Pemimpin Bisnis | XYZONEMEDIA",
      description: "Dapatkan berita terbaru seputar eksekutif, CEO, dan pemimpin bisnis di dunia industri dan teknologi hanya di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function CLevelLayout({ children }) {
  return <>{children}</>;
}
