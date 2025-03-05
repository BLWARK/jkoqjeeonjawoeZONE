import teknologiData from "@/data/teknologiData";

export async function generateMetadata() {
  // ✅ Ambil berita utama (jika ada)
  const mainArticle = teknologiData[0];

  return {
    title: "Berita Teknologi Terkini - AI, Gadget, Startup | XYZONEMEDIA",
    description:
      "Dapatkan berita terbaru seputar teknologi, AI, gadget, startup, dan inovasi digital terkini hanya di XYZONEMEDIA.",
    keywords:
      "berita teknologi, teknologi terbaru, gadget terbaru, startup, AI, inovasi digital, XYZONEMEDIA",
    openGraph: {
      title: "Berita Teknologi Terkini - AI, Gadget, Startup | XYZONEMEDIA",
      description:
        "Dapatkan berita terbaru seputar teknologi, AI, gadget, startup, dan inovasi digital terkini hanya di XYZONEMEDIA.",
      url: "https://xyzonemedia.com/teknologi",
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
      title: "Berita Teknologi Terkini - AI, Gadget, Startup | XYZONEMEDIA",
      description:
        "Dapatkan berita terbaru seputar teknologi, AI, gadget, startup, dan inovasi digital terkini hanya di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
  };
}

export default function TechnologyLayout({ children }) {
  return <>{children}</>;
}
