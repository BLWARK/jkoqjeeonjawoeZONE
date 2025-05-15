import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopNav from "@/components/navigation/TopNavbar";
import Navbar from "@/components/navigation/Navbar";
import Ecosystem from "@/components/navigation/Ecosystem";
import Footer from "@/components/footer/Footer";
import Tracking from "@/components/Tracking"
import Scrolltop from "@/components/scroll-to-top/Scroll"
import { BackProvider } from "@/context/BackContext";

import "./globals.css";

// Menggunakan font Roboto
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

// ✅ Metadata Lengkap untuk SEO & PWA
export const metadata: Metadata = {
  title: "XYZONEMEDIA - Berita dan Informasi Terkini",
  description:
    "XYZONEMEDIA adalah portal berita terpercaya yang menyajikan informasi terkini di dunia crypto, teknologi, dan keuangan.",
    icons: {
    icon: "/favicon.ico", // atau "/favicon.png"
  },
  keywords:
    "Xyzone Media, xyzonemedia, portal berita, informasi terkini, berita teknologi, berita keuangan, berita terkini",
  authors: [{ name: "Xyzone Team", url: "https://xyzone.media" }],
  alternates: {
    canonical: "https://xyzone.media",
  },
  openGraph: {
    title: "XYZONEMEDIA - Berita dan Informasi Terkini",
    description:
      "Dapatkan berita terbaru dari dunia crypto, keuangan, dan teknologi di XYZONEMEDIA.",
    url: "https://xyzone.media",
    siteName: "XYZONEMEDIA",
    images: [
      {
        url: "https://xyzone.media/XYZONELOGOAPP.png",
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
    images: ["https://xyzone.media/preview-image.jpg"],
  },
  manifest: "/site.webmanifest", // PWA Web Manifest
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* ✅ Tambahkan PWA support */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="l_arQzQREnB3JrRFH_koj6XNhCI2bUasKzT2pSH7w7g" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ff6600" />

        {/* ✅ JSON-LD Structured Data untuk SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NewsMediaOrganization",
              "name": "XYZONEMEDIA",
              "url": "https://xyzone,media",
              "logo": "https://xyzone.media/logo.png",
              "sameAs": [
                "https://twitter.com/XyzoneMedia",
                "https://www.facebook.com/XyzoneMedia",
                "https://www.instagram.com/XyzoneMedia"
              ],
              "publisher": {
                "@type": "Organization",
                "name": "XYZONEMEDIA",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://xyzone.media/logo.png",
                  "width": 600,
                  "height": 60
                }
              },
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://xyzone.media/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
      </head>
      <body className={roboto.className}>
      <BackProvider>
        <Tracking/>
        <div className="flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
          <TopNav />
          <Ecosystem />
          <Navbar />
          <main className="w-full 2xl:px-0">{children}</main>
          <Footer />
          <Scrolltop/>
        </div>
        </BackProvider>
      </body>
    </html>
  );
}
