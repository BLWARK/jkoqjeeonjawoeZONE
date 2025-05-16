import { getArticles } from "@/lib/api/";
import { platformSlugToId, platformSlugToName } from "@/lib/data/platformMaps";

export async function generateRegionalMetadata(slug) {
  const platformId = platformSlugToId[slug];
  const platformName = platformSlugToName[slug];

  if (!platformId || !platformName) {
    return {
      title: "Regional News | XYZONEMEDIA",
      description: "Berita lokal dan regional terkini dari berbagai daerah di Indonesia.",
    };
  }

  const articles = await getArticles(platformId, 1, 1); // ambil 1 artikel
  const main = articles[0];

  return {
    title: `Berita ${platformName} Terkini | XYZONEMEDIA`,
    description: `Berita terbaru dan aktual dari ${platformName}, hanya di XYZONEMEDIA.`,
    openGraph: {
      title: `Berita ${platformName} Hari Ini`,
      description: `Informasi penting dari ${platformName} setiap hari.`,
      url: `https://xyzone.media/regional/${slug}`,
      siteName: "XYZONEMEDIA",
      images: main
        ? [
            {
              url: main.image,
              width: 1200,
              height: 630,
              alt: main.title,
            },
          ]
        : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `Berita ${platformName} Hari Ini`,
      description: `Update terkini dari ${platformName} di XYZONEMEDIA.`,
      images: main ? [main.image] : [],
    },
  };
}
