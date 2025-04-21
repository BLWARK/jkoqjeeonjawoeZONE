import entertainmentNews from "@/data/entertainmentNews";

export async function generateMetadata() {
  // ✅ Ambil berita utama (jika ada)
  const mainArticle = entertainmentNews[0];

  return {
    title: "Entertainment News - Berita Seputar Hiburan & Selebriti | XYZONEMEDIA",
    description: "Dapatkan berita terbaru seputar dunia hiburan, film, musik, selebriti, dan gaya hidup hanya di XYZONEMEDIA.",
    keywords: "berita hiburan, selebriti, film terbaru, musik, gosip artis, gaya hidup, XYZONEMEDIA",
    openGraph: {
      title: "Entertainment News - Berita Seputar Hiburan & Selebriti | XYZONEMEDIA",
      description: "Dapatkan berita terbaru seputar dunia hiburan, film, musik, selebriti, dan gaya hidup hanya di XYZONEMEDIA.",
      url: "https://xyzonemedia.com/entertainment",
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
      title: "Entertainment News - Berita Seputar Hiburan & Selebriti | XYZONEMEDIA",
      description: "Dapatkan berita terbaru seputar dunia hiburan, film, musik, selebriti, dan gaya hidup hanya di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function EntertainmentLayout({ children }) {
  return <>{children}</>;
}
