import { getArticlesByLifestyle } from "@/lib/api/";

export async function generateMetadata() {
  const articles = await getArticlesByLifestyle(1, 1);
  const mainArticle = articles[0];

  const title = "Lifestyle News - Gaya Hidup, Kesehatan & Tren Terkini | XYZONEMEDIA";
  const description =
    "Temukan berita terbaru tentang gaya hidup, kesehatan, tren fashion, dan inspirasi sehari-hari hanya di XYZONEMEDIA.";
  const url = "https://xyzonemedia.com/lifestyle";

  return {
    title,
    description,
    keywords:
      "berita lifestyle, gaya hidup, kesehatan, tren terbaru, inspirasi hidup, fashion, XYZONEMEDIA",
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

export default function LifestyleLayout({ children }) {
  return <>{children}</>;
}
