import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import TopNav from "@/components/navigation/TopNavbar";
import Navbar from "@/components/navigation/Navbar";
import Ecosystem from "@/components/navigation/Ecosystem";
import Footer from "@/components/footer/Footer";
import Tracking from "@/components/Tracking";
import Scrolltop from "@/components/scroll-to-top/Scroll";
import { BackProvider } from "@/context/BackContext";
import Script from "next/script";

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
    "XYZONEMEDIA adalah adalah portal berita yang menyajikan berita terbaru, berita hari ini, artikel menarik, dan informasi terkini dari berbagai kategori seperti teknologi, hiburan, gaya hidup, dan olahraga",
  icons: {
    icon: "/logo.jpg", // atau "/favicon.png"
  },
  keywords:
    "Xyzone Media, xyzonemedia, portal berita, informasi terkini, berita teknologi, berita keuangan, berita terkini",
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
        url: "https://xyzonemedia.com/XYZONELOGOAPP.png",
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
        <meta
          name="google-site-verification"
          content="RSAlJodOSUpPQMKD9FJNeaE4D7evrXCbQ3mmBIl5LeQ" 
        />
        <meta name="msvalidate.01" content="98F79C92B69C4284488C28E54D68FABC" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/logo.jpg"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="XYZONEMEDIA" />
        <meta name="theme-color" content="#ff6600" />

        {/* ✅ Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-S6SC0MPZP0"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S6SC0MPZP0');
          `}
        </Script>

        {/* ✅ JSON-LD Structured Data untuk SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "XYZONEMEDIA",
              url: "https://xyzonemedia.com",
              logo: {
                "@type": "ImageObject",
                url: "https://xyzonemedia.com/logo.png", // 💡 Ganti dengan PNG transparan resolusi tinggi
                width: 300,
                height: 300,
              },
              sameAs: [
                "https://twitter.com/XyzoneMedia",
                "https://www.facebook.com/XyzoneMedia",
                "https://www.instagram.com/XyzoneMedia",
              ],
            }),
          }}
        />
      </head>
      <body className={roboto.className}>
        <BackProvider>
          <Tracking />
          <div className="flex flex-col justify-center items-center overflow-hidden bg-gray-100 w-full">
            <TopNav />
            <Ecosystem />
            <Navbar />
            <main className="w-full 2xl:px-0">{children}</main>
            <Footer />
            <Scrolltop />
          </div>
        </BackProvider>
      </body>
    </html>
  );
}
