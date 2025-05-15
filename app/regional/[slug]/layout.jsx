import regionMetaMap from "@/data/regionMetaMap";

export async function generateMetadata(context) {
const { slug } = await context.params;
  const meta = regionMetaMap[slug];

  if (!meta) {
    return {
      title: "Berita Regional | XYZONEMEDIA",
      description: "Kumpulan berita terkini dari berbagai daerah Indonesia.",
      keywords: "berita daerah, berita regional, provinsi Indonesia",
      robots: "noindex, follow", // Optional
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://xyzone.media/regional/${slug}`,
      images: [
        {
          url: "https://xyzone.media/og-image-regional.jpg", // opsional
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["https://xyzone.media/og-image-regional.jpg"],
    },
  };
}

export default function RegionalLayout({ children }) {
  return <>{children}</>;
}
