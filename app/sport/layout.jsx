import sportNews from "@/data/sportNews";

export async function generateMetadata() {
  // ✅ Ambil berita utama (jika ada)
  const mainArticle = sportNews[0];

  return {
    title: "Berita Olahraga Terbaru - Sepak Bola, MotoGP & Lainnya | XYZONEMEDIA",
    description:
      "Dapatkan berita olahraga terbaru dari dunia sepak bola, MotoGP, F1, bulu tangkis, dan cabang olahraga lainnya hanya di XYZONEMEDIA.",
    keywords:
      "berita olahraga, berita sepak bola, MotoGP, F1, bulu tangkis, olahraga terbaru, XYZONEMEDIA",
    openGraph: {
      title: "Berita Olahraga Terbaru - Sepak Bola, MotoGP & Lainnya | XYZONEMEDIA",
      description:
        "Dapatkan berita olahraga terbaru dari dunia sepak bola, MotoGP, F1, bulu tangkis, dan cabang olahraga lainnya hanya di XYZONEMEDIA.",
      url: "https://xyzone.media/olahraga",
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
      title: "Berita Olahraga Terbaru - Sepak Bola, MotoGP & Lainnya | XYZONEMEDIA",
      description:
        "Dapatkan berita olahraga terbaru dari dunia sepak bola, MotoGP, F1, bulu tangkis, dan cabang olahraga lainnya hanya di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function SportLayout({ children }) {
  return <>{children}</>;
}
