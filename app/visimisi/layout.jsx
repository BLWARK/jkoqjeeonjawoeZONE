export const metadata = {
  title: "Visi dan Misi | XYZONEMEDIA",
  description:
    "Kenali visi dan misi XYZONEMEDIA dalam membangun platform digital yang menginspirasi dan memberdayakan generasi X, Y, dan Z.",
  keywords:
    "visi, misi, tentang kami, tujuan media digital, XYZONEMEDIA, komunitas digital, generasi muda",
  openGraph: {
    title: "Visi dan Misi | XYZONEMEDIA",
    description:
      "Kenali visi dan misi XYZONEMEDIA dalam membangun platform digital yang menginspirasi dan memberdayakan generasi X, Y, dan Z.",
    url: "https://xyzonemedia.com/visi-misi",
    siteName: "XYZONEMEDIA",
    images: [
      {
        url: "https://xyzonemedia.com/images/og-visimisi.jpg", // ganti dengan OG image visimisi lo
        width: 1200,
        height: 630,
        alt: "Visi dan Misi XYZONEMEDIA",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Visi dan Misi | XYZONEMEDIA",
    description:
      "Pelajari tujuan dan semangat di balik platform XYZONEMEDIA.",
    images: ["https://xyzonemedia.com/images/og-visimisi.jpg"],
  },
};

export default function Layout({ children }) {
  return <>{children}</>;
}
