import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopNav from "@/components/navigation/TopNavbar"
import Navbar from "@/components/navigation/Navbar";
import Ecosystem from "@/components/navigation/Ecosystem"
import Footer from "@/components/footer/Footer"

import "./globals.css";

// Menggunakan font Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"], // Sesuaikan sesuai kebutuhan
});

export const metadata: Metadata = {
  title: "XYZONEMEDIA - Berita dan Informasi Terkini",
  description: "Xyzone Media adalah portal berita terpercaya yang menyajikan informasi terkini di dunia crypto, teknologi, dan keuangan.",
  keywords: "Xyzone Media, portal berita, informasi terkini, berita teknologi, berita keuangan, berita terkini",
  authors: [{ name: "Xyzone Team", url: "https://xyzonemedia.com" }],
  openGraph: {
    title: "Xyzone Media - Berita dan Informasi Terkini",
    description: "Dapatkan berita terbaru dari dunia crypto, keuangan, dan teknologi di Xyzone Media.",
    url: "https://xyzonemedia.com",
    siteName: "Xyzone Media",
    images: [
      {
        url: "https://xyzonemedia.com/preview-image.jpg", // Ganti dengan link gambar preview kamu
        width: 800,
        height: 600,
        alt: "Xyzone Media",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@XyzoneMedia", // Ganti dengan akun Twitter kamu jika ada
    creator: "@XyzoneTeam",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO Metadata tambahan */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={roboto.className}>
        <div className=" flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
          <TopNav/>
          <Ecosystem/>
          <Navbar />
          
          <main className=" w-full 2xl:px-0 ">
            {children}
          </main>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
