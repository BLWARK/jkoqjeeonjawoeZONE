import { generateRegionalMetadata } from "@/lib/metadata/generateRegionalMeta";

export async function generateMetadata(context) {
  const { slug } = await context.params;
  return await generateRegionalMetadata(slug);
}


export default function RegionalLayout({ children }) {
  return <>{children}</>;
}
