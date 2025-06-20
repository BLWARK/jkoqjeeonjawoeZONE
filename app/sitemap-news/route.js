import { format } from "date-fns";

export async function GET() {
  const res = await fetch('https://api.xyzone.media/api/articles?status=publish&page=1&limit=100&sort=date&order=desc', {
    headers: {
      'Cache-Control': 'no-store',
    },
    next: {
      revalidate: 0,
    }
  });

  const json = await res.json();
  const articles = json?.data || [];

  const newsItems = articles
    .filter((article) => article?.article_id && article?.slug && article?.title && article?.created_at)
    .map((article) => `
      <url>
        <loc>https://xyzonemedia.com/artikel/${article.article_id}/${article.slug}</loc>
        <news:news>
          <news:publication>
            <news:name>XYZONEMEDIA</news:name>
            <news:language>id</news:language>
          </news:publication>
          <news:publication_date>${format(new Date(article.created_at), "yyyy-MM-dd'T'HH:mm:ssXXX")}</news:publication_date>
          <news:title><![CDATA[${article.title}]]></news:title>
        </news:news>
      </url>`);

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      ${newsItems.join('\n')}
    </urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'no-store',
    },
  });
}
