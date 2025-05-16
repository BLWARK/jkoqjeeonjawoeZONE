import { getArticlesBySport } from "../../lib/api";

export async function generateMetadata() {
  const articles = await getArticlesBySport(1, 1); // platform_id = 1 (nasional)
  const mainArticle = articles[0];

  const title = "Berita Olahraga Terbaru - Sepak Bola, MotoGP & Lainnya | XYZONEMEDIA";
  const description =
    "Dapatkan berita olahraga terbaru dari dunia sepak bola, MotoGP, F1, bulu tangkis, dan cabang olahraga lainnya hanya di XYZONEMEDIA.";
  const url = "https://xyzone.media/olahraga";

  return {
    title,
    description,
    keywords:
      "berita olahraga, berita sepak bola, MotoGP, F1, bulu tangkis, olahraga terbaru, XYZONEMEDIA",
    openGraph: {
      title,
      description,
      url,
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
      title,
      description,
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function SportLayout({ children }) {
  return <>{children}</>;
}
