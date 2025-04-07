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

  // ✅ Fungsi untuk mengambil data headlines dari backend dengan `useCallback`
  const getHeadlines = useCallback(async (platformId) => {
    try {
      const response = await customGet(
        `/api/headlines?platform_id=${platformId}`
      );
      if (response?.data) {
        const sortedHeadlines = response.data.sort(
          (a, b) => a.position - b.position
        );
        setHeadlines(sortedHeadlines);
      }
    } catch (error) {
      console.error("Failed to fetch headlines:", error);
    }
  }, []);

  // ✅ Fungsi untuk mengambil data artikel dari backend dengan `useCallback`
  const getArticles = useCallback(async (platformId, page = 1, limit = 10) => {
    try {
      const response = await customGet(
        `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&status=all`
      );
      if (response?.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  }, []);

  const getArticleBySlug = async (slug) => {
    const encodedSlug = encodeURIComponent(slug);
    try {
      const response = await customGet(`/api/articles-by-slug/${encodedSlug}`);

      if (response) {
        console.log("✅ Data Sebelum Set State:", response);

        setTimeout(() => {
          setCurrentArticle({ ...response }); // Langsung ambil response
        }, 10);
      } else {
        console.warn("❌ Article not found");
        setCurrentArticle(null);
      }
    } catch (error) {
      console.error(`❌ Error: ${error.response?.status} - ${error.message}`);
      setCurrentArticle(null);
    }
  };

  // ✅ Fungsi untuk mengambil artikel berdasarkan views
  const getArticlesByViews = useCallback(
    async (platformId, page = 1, limit = 10) => {
      try {
        const response = await customGet(
          `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}`
        );

        if (response?.data) {
          console.log(
            "🔥 Articles by Views Response:",
            JSON.stringify(response.data, null, 2)
          );
          setPopularArticles(response.data); // ✅ Data sudah terfilter dan ter-sort berdasarkan views
        }
      } catch (error) {
        console.error("❌ Failed to fetch articles by views:", error);
      }
    },
    []
  );

  const getArticlesByTag = useCallback(async (tag, page = 1, limit = 6) => {
    try {
      const response = await customGet(
        `/api/articles?tags=${tag}&platform_id=1&page=${page}&limit=${limit}`
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
  }, []);

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
          `/api/articles?platform_id=${platformId}&page=${page}&limit=${limit}&sort=date&order=desc`
        );

        if (response?.data) {
          setLatestArticles(response.data);
        }
      } catch (error) {
        console.error("❌ Gagal mengambil artikel terbaru:", error);
      }
    },
    []
  );

  // ✅ Gunakan `useEffect` tanpa menyebabkan loop
  useEffect(() => {
    getHeadlines(1); // platformId = 1
    getEditorChoices(1); // platformId = 1
  }, [getHeadlines, getEditorChoices]);

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
      }}
    >
      {children}
    </BackContext.Provider>
  );
};

export const useBackContext = () => useContext(BackContext);
