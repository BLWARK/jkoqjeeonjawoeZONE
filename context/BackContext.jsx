"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { customGet } from "@/hooks/customAxios";

const BackContext = createContext();

export const BackProvider = ({ children }) => {
  const [headlines, setHeadlines] = useState([]);
  const [articles, setArticles] = useState([]);
  const [editorChoices, setEditorChoices] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [popularArticles, setPopularArticles] = useState([]);
  const [latestArticles, setLatestArticles] = useState([]);
  const [articlesByTag, setArticlesByTag] = useState([]);
  const [articlesByTagMeta, setArticlesByTagMeta] = useState({});
  const [articlesByCategory, setArticlesByCategory] = useState({});
  const [articlesByCategoryMeta, setArticlesByCategoryMeta] = useState({});
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [platformLogos, setPlatformLogos] = useState({});
  const [platformSlugToId, setPlatformSlugToId] = useState({});
  const [platformIdToSlug, setPlatformIdToSlug] = useState({});

  const getHeadlines = useCallback(async (platformId, headlineCategory) => {
    if (!platformId || !headlineCategory) return;

    try {
      const response = await customGet(
        `/api/headlines?platform_id=${platformId}&headline_category=${headlineCategory}`
      );
      if (response?.data) {
        const sortedHeadlines = response.data.sort(
          (a, b) => a.position - b.position
        );

        setHeadlines((prev) => ({
          ...prev,
          [platformId]: sortedHeadlines, // ✅ simpan data per platform ID
        }));
      }
    } catch (error) {
      console.error("❌ Failed to fetch headlines:", error);
    }
  }, []);

  // ✅ Fungsi untuk mengambil data artikel dari backend dengan `useCallback`
  const getArticles = useCallback(async (platformId, page = 1, limit = 10) => {
    try {
      const response = await customGet(
        `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&status=publish`
      );
      if (response?.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  }, []);

  const getArticleBySlug = useCallback(async (slug) => {
    if (!slug) return;

    const encodedSlug = encodeURIComponent(slug);
    try {
      const response = await customGet(`/api/articles-by-slug/${encodedSlug}`);
      if (response) {
        console.log("✅ Article fetched:", response);
        setCurrentArticle(response);
      } else {
        setCurrentArticle(null);
      }
    } catch (error) {
      console.error("❌ Error fetching article:", error);
      setCurrentArticle(null);
    }
  }, []);

  // ✅ Fungsi untuk mengambil artikel berdasarkan views
  const getArticlesByViews = useCallback(
    async (platformId, page = 1, limit = 10) => {
      try {
        const response = await customGet(
          `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&status=publish`
        );

        if (response?.data) {
          const sorted = response.data.sort((a, b) => b.views - a.views); // ⬅️ Urutkan di frontend
          setPopularArticles(sorted);
        }
      } catch (error) {
        console.error("❌ Failed to fetch articles by views:", error);
      }
    },
    []
  );

 const getArticlesByTag = useCallback(
  async (tags, platformId, page = 1, limit = 20) => {
    if (!tags || !platformId) return;

    try {
      const response = await customGet(
        `/api/articles?tags=${tags}&platform_id=${platformId}&page=${page}&limit=${limit}&status=publish`
      );
      if (response?.data) {
        setArticlesByTag(response.data);
      }
      if (response?.meta) {
        setArticlesByTagMeta(response.meta);
      }
    } catch (error) {
      console.error("❌ Gagal mengambil artikel berdasarkan tag:", error);
    }
  },
  []
);


 const getArticlesByCategory = useCallback(
  async (category, platformId = 1, page = 1, limit = 9) => {
    try {
      const res = await customGet(
        `/api/articles?category=${category}&platform_id=${platformId}&page=${page}&limit=${limit}&status=publish`
      );
      
      if (res?.data) {
        setArticlesByCategory((prev) => ({
          ...prev,
          [category]: res.data,
        }));
      }

      if (res?.meta) {
        setArticlesByCategoryMeta((prev) => ({
          ...prev,
          [category]: res.meta,
        }));
      }

      return res; // 🔁 Tambahkan ini biar bisa di `await` dan dapat datanya
    } catch (error) {
      console.error(
        `❌ Gagal mengambil artikel untuk kategori ${category}:`,
        error
      );
      return null;
    }
  },
  []
);

  // ✅ Fungsi untuk mengambil data editor choices dari backend dengan `useCallback`
  const getEditorChoices = useCallback(async (platformId) => {
    try {
      const response = await customGet(
        `/api/editor-choices?platform_id=${platformId}`
      );
      if (response?.data) {
        const sortedEditorChoices = response.data.sort(
          (a, b) => a.position - b.position
        );
        setEditorChoices(sortedEditorChoices);
      }
    } catch (error) {
      console.error("Failed to fetch editor choices:", error);
    }
  }, []);

  const getLatestArticles = useCallback(
  async (platformId = 1, page = 1, limit = 6) => {
    try {
      const response = await customGet(
        `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&status=publish&sort=date&order=desc`
      );

      if (response?.data) {
        setLatestArticles((prev) => ({
          ...prev,
          [platformId]: response.data, // ✅ PER PLATFORM
        }));
      }
    } catch (error) {
      console.error("❌ Gagal mengambil artikel terbaru:", error);
    }
  },
  []
);


  // Di dalam BackContext.js
 const searchArticles = useCallback(
  async (query, platformId) => {
    if (!query || !platformId) return [];

    try {
      setSearchLoading(true);
      const response = await customGet(
        `/api/articles?search=${encodeURIComponent(query)}&platform_id=${platformId}`
      );
      if (response?.data) {
        setSearchResults(response.data);
        return response.data;
      }
      setSearchResults([]);
      return [];
    } catch (error) {
      console.error("❌ Failed to search articles:", error);
      setSearchResults([]);
      return [];
    } finally {
      setSearchLoading(false);
    }
  },
  []
);


  // Fetch data platform
  const getAllPlatformLogos = useCallback(async () => {
    try {
      const res = await customGet("/api/platforms");
      const logos = {};

      res.data.forEach((platform) => {
        logos[platform.platform_name] = {
          logo_url: platform.logo_url,
        };
      });

      setPlatformLogos(logos);
    } catch (err) {
      console.error("❌ Gagal ambil logo platform:", err);
    }
  }, []);

  const getAllPlatforms = useCallback(async () => {
    try {
      const res = await customGet("/api/platforms");
      if (res?.data) {
        const slugToId = {};
        const idToSlug = {};
        res.data.forEach((platform) => {
          const slug = platform.platform_name.toLowerCase().replace(/\s+/g, "-");
          slugToId[slug] = platform.platform_id;
          idToSlug[platform.platform_id] = slug;
        });
        setPlatformSlugToId(slugToId);
        setPlatformIdToSlug(idToSlug);
      }
    } catch (err) {
      console.error("Gagal mengambil daftar platform", err);
    }
  }, []);

  const getCategoriesByPlatform = async (platformId) => {
  if (!platformId) return [];

  try {
    const response = await customGet(`/api/categories?platform_id=${platformId}`);
    console.log("✅ Data kategori dari backend:", response?.data || []);
    return response?.data || [];
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
};

useEffect(() => {
  getAllPlatforms(); // ✅ fetch mapping slug/id saat awal
}, [getAllPlatforms]);



  
  // ✅ Gunakan `useEffect` tanpa menyebabkan loop
  useEffect(() => {
    getHeadlines(1); // platformId = 1
    getEditorChoices(1); // platformId = 1
  }, [getHeadlines, getEditorChoices]);

  useEffect(() => {
    getAllPlatformLogos(); // ✅ cukup satu kali saja di context
  }, [getAllPlatformLogos]);

  return (
    <BackContext.Provider
      value={{
        headlines,
        getHeadlines,
        articles,
        getArticles,
        editorChoices,
        getEditorChoices,
        currentArticle, // ✅ Tambahkan ini!
        getArticleBySlug, // ✅ Tambahkan ini!
        getArticlesByViews, // ✅ Tambahkan di sini!
        popularArticles, // ✅ Tambahkan state untuk artikel populer
        getLatestArticles, // ✅ DITAMBAHKAN
        latestArticles, // ✅ DITAMBAHKAN
        getArticlesByTag,
        articlesByTag,
        articlesByTagMeta,
        getArticlesByCategory,
        articlesByCategory,
        articlesByCategoryMeta,
        searchArticles,
        searchResults,
        searchLoading,
        getAllPlatformLogos,
        platformLogos,
        platformSlugToId,
        platformIdToSlug,
        getAllPlatforms,
        getCategoriesByPlatform,
      }}
    >
      {children}
    </BackContext.Provider>
  );
};

export const useBackContext = () => useContext(BackContext);
