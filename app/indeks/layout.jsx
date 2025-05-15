import { getArticles } from "@/lib/api"; // ⬅️ Pastikan kamu punya fungsi ini (atau sesuaikan)
const platformId = 1; // Nasional

export async function generateMetadata() {
  // ✅ Ambil 1 artikel terbaru sebagai metadata utama (jika kamu pakai fetch dinamis)
  let mainArticle;
  try {
    const data = await getArticles(platformId, 1, 1); // page 1, size 1
    mainArticle = data?.[0];
  } catch (err) {
    console.error("❌ Gagal ambil artikel indeks:", err);
  }

  return {
    title: "Indeks Berita Terbaru hari ini - XYZONEMEDIA",
    description:
      "Kumpulan berita terbaru dan terlengkap dari berbagai kategori di XYZONEMEDIA. Temukan informasi aktual hari ini.",
    keywords:
      "berita terbaru, indeks berita, berita hari ini, nasional, XYZONEMEDIA",
    openGraph: {
      title: "Indeks Berita Terbaru - XYZONEMEDIA",
      description:
        "Kumpulan berita terbaru dan terlengkap dari berbagai kategori di XYZONEMEDIA. Temukan informasi aktual hari ini.",
      url: "https://xyzone.media/indeks",
      siteName: "XYZONEMEDIA",
      images: mainArticle
        ? [
            {
              url: mainArticle.image || "/default.jpg",
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
      title: "Indeks Berita Terbaru - XYZONEMEDIA",
      description:
        "Kumpulan berita terbaru dan terlengkap dari berbagai kategori di XYZONEMEDIA.",
      images: mainArticle ? [mainArticle.image] : [],
    },
    alternates: {
      canonical: "https://xyzone.media/indeks",
    },
  };
}

export default function IndeksLayout({ children }) {
  return <>{children}</>;
}
