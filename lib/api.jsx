// ✅ Ambil semua artikel (biarkan tetap untuk keperluan daftar artikel)
export async function getArticles(platformId, page = 1, limit = 50) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&status=all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // Jika butuh token
        },
        cache: "no-store", // Hindari cache agar data selalu fresh
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch articles`);
    }

    const data = await res.json();

    return data?.data || []; // ✅ Kembalikan array artikel
  } catch (error) {
    console.error("❌ Error fetching articles:", error);
    return [];
  }
}

// ✅ Fungsi baru untuk ambil satu artikel berdasarkan slug
export async function getArticleBySlug(slug) {
  try {
    const encodedSlug = encodeURIComponent(slug);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles-by-slug/${encodedSlug}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // Jika butuh token
        },
        cache: "no-store", // ✅ Hindari cache agar data selalu fresh
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch article with slug: ${slug}`);
    }

    const article = await res.json();

    console.log("🔥 Article Response:", JSON.stringify(article, null, 2));

    return article || null; // ✅ Kembalikan data artikel langsung (bukan di dalam `data`)
  } catch (error) {
    console.error(`❌ Error fetching article with slug: ${slug}`, error);
    return null; // ✅ Jika gagal, kembalikan `null`
  }
}

// ✅ Fungsi baru untuk ambil artikel berdasarkan tag
export async function getArticlesByTag(tag, platformId = 1, page = 1, limit = 6) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?tags=${tag}&platform_id=${platformId}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch articles with tag: ${tag}`);
    }

    const response = await res.json();
    return response?.data || [];
  } catch (error) {
    console.error(`❌ Error fetching articles with tag: ${tag}`, error);
    return [];
  }
}
