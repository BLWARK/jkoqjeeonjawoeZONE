import { getArticlesByEntertainment } from "@/lib/api/";

export async function generateMetadata() {
  const articles = await getArticlesByEntertainment(1, 1); // platform nasional
  const mainArticle = articles[0];

  const title = "Entertainment News - Berita Seputar Hiburan & Selebriti | XYZONEMEDIA";
  const description = "Dapatkan berita terbaru seputar dunia hiburan, film, musik, selebriti, dan gaya hidup hanya di XYZONEMEDIA.";
  const url = "https://xyzonemedia.com/entertaintment";

  return {
    title,
    description,
    keywords: "berita hiburan, selebriti, film terbaru, musik, gosip artis, gaya hidup, XYZONEMEDIA",
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

export default function EntertainmentLayout({ children }) {
  return <>{children}</>;
}
