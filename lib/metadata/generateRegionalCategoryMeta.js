import { getArticlesByCategory } from "@/lib/api/"; // pastikan ada
import { platformSlugToId, platformSlugToName } from "@/lib/data/platformMaps";

// 🔧 slug = jawa-barat, category_slug = kuliner-13
export async function generateRegionalCategoryMetadata(slug, categorySlugRaw) {
  const platformId = platformSlugToId[slug];
  const platformName = platformSlugToName[slug];

  if (!platformId || !platformName) {
    return {
      title: "Berita Daerah | XYZONEMEDIA",
      description: "Kumpulan berita terkini dari berbagai kategori daerah Indonesia.",
      robots: "noindex, follow",
    };
  }

  // 🔍 Ubah category_slug seperti 'kuliner-13' → 'Kuliner'
  const category = categorySlugRaw?.split("-")[0]?.replace(/-/g, " ");
  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);

  const articles = await getArticlesByCategory(categoryName, platformId, 1, 1);
  const main = articles?.data?.[0];

  return {
    title: `${categoryName} ${platformName} Terbaru | XYZONEMEDIA`,
    description: `Baca berita ${categoryName.toLowerCase()} dari ${platformName}. Update kuliner, budaya, wisata, dan lainnya.`,
    keywords: `berita ${categoryName.toLowerCase()}, ${categoryName.toLowerCase()} ${platformName.toLowerCase()}, berita daerah`,
    openGraph: {
      title: `Berita ${categoryName} ${platformName}`,
      description: `Update ${categoryName} dari ${platformName} hanya di XYZONEMEDIA.`,
      url: `https://xyzonemedia.com/regional/${slug}/kategori/${categorySlugRaw}`,
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
      title: `Berita ${categoryName} ${platformName}`,
      description: `Berita terbaru ${categoryName} di ${platformName}.`,
      images: main?.image ? [main.image] : [],
    },
  };
}
