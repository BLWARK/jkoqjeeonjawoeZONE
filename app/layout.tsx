import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopNav from "@/components/navigation/TopNavbar";
import Navbar from "@/components/navigation/Navbar";
import Ecosystem from "@/components/navigation/Ecosystem";
import Footer from "@/components/footer/Footer";

import "./globals.css";

// Menggunakan font Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

// ✅ Metadata Default untuk Halaman Utama Saja
export const metadata: Metadata = {
  title: "XYZONEMEDIA - Berita dan Informasi Terkini",
  description:
    "XYZONEMEDIA adalah portal berita terpercaya yang menyajikan informasi terkini di dunia crypto, teknologi, dan keuangan.",
  keywords:
    "Xyzone Media, portal berita, informasi terkini, berita teknologi, berita keuangan, berita terkini",
  authors: [{ name: "Xyzone Team", url: "https://xyzonemedia.com" }],
  alternates: {
    canonical: "https://xyzonemedia.com",
  },
  openGraph: {
    title: "XYZONEMEDIA - Berita dan Informasi Terkini",
    description:
      "Dapatkan berita terbaru dari dunia crypto, keuangan, dan teknologi di XYZONEMEDIA.",
    url: "https://xyzonemedia.com",
    siteName: "XYZONEMEDIA",
    images: [
      {
        url: "https://xyzonemedia.com/preview-image.jpg",
        width: 1200,
        height: 630,
        alt: "XYZONEMEDIA",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@XyzoneMedia",
    creator: "@XyzoneTeam",
    title: "XYZONEMEDIA - Berita dan Informasi Terkini",
    description:
      "Dapatkan berita terbaru dari dunia crypto, keuangan, dan teknologi di XYZONEMEDIA.",
    images: ["https://xyzonemedia.com/preview-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={roboto.className}>
        <div className="flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
          <TopNav />
          <Ecosystem />
          <Navbar />

          <main className="w-full 2xl:px-0">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
