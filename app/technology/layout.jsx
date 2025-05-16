import { getArticlesByTechnology } from "@/lib/api/";

export async function generateMetadata() {
  const articles = await getArticlesByTechnology(1, 1); // platform_id = 1, limit 1
  const mainArticle = articles[0];

  const title = "Berita Teknologi Terkini - AI, Gadget, Startup | XYZONEMEDIA";
  const description =
    "Dapatkan berita terbaru seputar teknologi, AI, gadget, startup, dan inovasi digital terkini hanya di XYZONEMEDIA.";
  const url = "https://xyzone.media/technology";

  return {
    title,
    description,
    keywords:
      "berita teknologi, teknologi terbaru, gadget terbaru, startup, AI, inovasi digital, XYZONEMEDIA",
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

export default function TechnologyLayout({ children }) {
  return <>{children}</>;
}
