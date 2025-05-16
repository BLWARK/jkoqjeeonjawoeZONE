import { getArticles } from "@/lib/api/";
import { platformSlugToId, platformSlugToName } from "@/lib/data/platformMaps";

export async function generateRegionalIndeksMetadata(slug) {
  const platformId = platformSlugToId[slug];
  const platformName = platformSlugToName[slug];

  if (!platformId || !platformName) {
    return {
      title: "Indeks Berita Regional | XYZONEMEDIA",
      description: "Kumpulan berita dari berbagai daerah Indonesia.",
      robots: "noindex, follow",
    };
  }

  const articles = await getArticles(platformId, 1, 1);
  const main = articles?.[0];

  return {
    title: `Indeks Berita ${platformName} Hari Ini | XYZONEMEDIA`,
    description: `Kumpulan berita terbaru dari ${platformName}. Update harian dari berbagai kategori berita.`,
    keywords: `indeks berita ${platformName.toLowerCase()}, berita ${platformName.toLowerCase()}, berita daerah`,
    openGraph: {
      title: `Indeks Berita ${platformName} Hari Ini`,
      description: `Berita lengkap dari ${platformName}, update tiap hari.`,
      url: `https://xyzone.media/regional/${slug}/indeks`,
      images: main?.image
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
      title: `Indeks Berita ${platformName}`,
      description: `Berita terkini dari ${platformName}, semua kategori.`,
      images: main?.image ? [main.image] : [],
    },
  };
}
