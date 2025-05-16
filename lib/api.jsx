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


export async function getArticlesByTechnology(platformId = 1, limit = 1, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=TECHNOLOGY&platform_id=${platformId}&limit=${limit}&page=${page}&status=publish`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // opsional
        },
        cache: "no-store", // ✅ Hindari cache untuk SSR dinamis
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch TECHNOLOGY articles (platform ${platformId})`);
    }

    const response = await res.json();
    return response?.data || [];
  } catch (error) {
    console.error("❌ Error fetching TECHNOLOGY articles:", error);
    return [];
  }
}

export async function getArticlesBySport(platformId = 1, limit = 1, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=SPORT&platform_id=${platformId}&limit=${limit}&page=${page}&status=publish`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // opsional
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch sport articles");
    const json = await res.json();
    return json?.data || [];
  } catch (err) {
    console.error("❌ Error fetching SPORT articles:", err);
    return [];
  }
}


export async function getArticlesByEntertainment(platformId = 1, limit = 1, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=ENTERTAINTMENT&platform_id=${platformId}&limit=${limit}&page=${page}&status=publish`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // optional
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch entertainment articles");

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("❌ Error fetching ENTERTAINTMENT articles:", err);
    return [];
  }
}

export async function getArticlesByCLevel(platformId = 1, limit = 1, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=C-LEVEL&platform_id=${platformId}&limit=${limit}&page=${page}&status=publish`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // kalau pakai token
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch C-LEVEL articles");

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("❌ Error fetching C-LEVEL articles:", err);
    return [];
  }
}


export async function getArticlesByLifestyle(platformId = 1, limit = 1, page = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=LIFESTYLE&platform_id=${platformId}&limit=${limit}&page=${page}&status=publish`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // opsional
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch LIFESTYLE articles");

    const data = await res.json();
    return data?.data || [];
  } catch (err) {
    console.error("❌ Error fetching LIFESTYLE articles:", err);
    return [];
  }
}

export async function fetchCategoriesByPlatform(platformId) {
  if (!platformId) return [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/categories?platform_id=${platformId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store", // wajib di SSR untuk metadata
      }
    );

    if (!res.ok) throw new Error("Failed to fetch categories");
    const result = await res.json();
    return result?.data || [];
  } catch (error) {
    console.error("❌ Gagal ambil kategori:", error);
    return [];
  }
}

// lib/api/articles.js

export async function getArticlesByCategory(category, platformId, page = 1, limit = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/articles?category=${encodeURIComponent(
        category
      )}&platform_id=${platformId}&page=${page}&limit=${limit}&status=publish`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) throw new Error("Failed to fetch articles by category");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("❌ Gagal ambil artikel kategori:", error);
    return [];
  }
}







