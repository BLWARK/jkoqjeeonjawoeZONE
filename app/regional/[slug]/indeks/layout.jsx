import { generateRegionalIndeksMetadata } from "@/lib/metadata/generateRegionalIndeksMeta";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return await generateRegionalIndeksMetadata(slug);
}

export default function RegionalIndeksLayout({ children }) {
  return <>{children}</>;
}
