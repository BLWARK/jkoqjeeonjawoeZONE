import { getArticlesByCLevel } from "@/lib/api/";

export async function generateMetadata() {
  const articles = await getArticlesByCLevel(1, 1);
  const mainArticle = articles[0];

  const title = "C-Level News - Berita Eksekutif, CEO, dan Pemimpin Bisnis | XYZONEMEDIA";
  const description =
    "Dapatkan berita terbaru seputar eksekutif, CEO, dan pemimpin bisnis di dunia industri dan teknologi hanya di XYZONEMEDIA.";
  const url = "https://xyzone.media/c-level";

  return {
    title,
    description,
    keywords: "C-Level, CEO, eksekutif, berita bisnis, pemimpin industri, XYZONEMEDIA",
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

export default function CLevelLayout({ children }) {
  return <>{children}</>;
}
