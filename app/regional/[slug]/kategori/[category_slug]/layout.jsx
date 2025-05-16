import { generateRegionalCategoryMetadata } from "@/lib/metadata/generateRegionalCategoryMeta";

export async function generateMetadata({ params }) {
  const { slug, category_slug } = await params;
  return await generateRegionalCategoryMetadata(slug, category_slug);
}

export default function RegionalCategoryLayout({ children }) {
  return <>{children}</>;
}
