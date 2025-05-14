"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import LatestNewsReg from "@/components/latestNewsReg/LatestNewsReg";
import AdvBottomHead from "@/components/page-components/adv-sect/AdvBottomHead";

// Fungsi potong deskripsi
const sliceDescription = (desc, maxChars = 120) =>
  desc.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;

const RegionalCategoryPage = () => {
  const { slug, category_slug } = useParams();
  const {
    getHeadlines,
    headlines,
    platformSlugToId,
    getCategoriesByPlatform,
    getAllPlatforms,
  } = useBackContext();

  const [isLoading, setIsLoading] = useState(true);
  const [categoryList, setCategoryList] = useState([]);
  const platformId = platformSlugToId?.[slug];
  const headlineData = headlines[platformId] || [];
  const getCategoriesByPlatformRef = useRef(getCategoriesByPlatform);
const getHeadlinesRef = useRef(getHeadlines);
const getAllPlatformsRef = useRef(getAllPlatforms);



  useEffect(() => {
  const fetchData = async () => {
    if (!slug || !category_slug) return;

    // ✅ Jika mapping slug → ID belum ada, ambil dulu semua platform
    if (!platformSlugToId?.[slug]) {
      await getAllPlatforms(); // 👈 pastikan ini ada di context
      return;
    }

    const pid = platformSlugToId[slug];
    if (!pid) return;

    setIsLoading(true);

    const categories = await getCategoriesByPlatformRef.current(pid);
    const matchedCategory = categories.find((cat) => cat.category_slug === category_slug);

    if (!matchedCategory) {
      console.warn("⚠️ Kategori slug tidak ditemukan:", category_slug);
      setIsLoading(false);
      return;
    }

    await getHeadlinesRef.current(pid, matchedCategory.category_name);
    setIsLoading(false);
  };

  fetchData();
}, [slug, category_slug, platformSlugToId]);



  const mainArticle = headlineData.find((item) => item.position === 1)?.article;
  const secondaryArticles = headlineData
    .filter((item) => [2, 3, 4].includes(item.position))
    .map((item) => item.article);

  const formatCategoryTitle = (slug) =>
    slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

  if (!platformId) {
    return <p className="text-center py-10">Memuat platform...</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 px-4">
      

      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* 🔹 Artikel utama */}
          {mainArticle && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              <Image
                src={mainArticle.image || "/default.jpg"}
                alt={mainArticle.title}
                fill
                className="object-cover"
              />
              <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </Link>
              <div className="absolute bottom-5 left-5 text-white">
                <h1 className="text-3xl font-bold hover:underline">
                  <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`}>
                    {mainArticle.title}
                  </Link>
                </h1>
                <p className="mt-2 text-sm">{sliceDescription(mainArticle.description || "")}</p>
                <div className="flex items-center text-sm mt-3">
                  <Image
                    src={mainArticle.author?.avatar || "/default-avatar.jpg"}
                    alt={mainArticle.author?.username || "Unknown"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="ml-2">{mainArticle.author?.username || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-white mx-2" />
                  <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* 🔹 Artikel samping */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {secondaryArticles.map((article) => (
              <div key={article.article_id} className="relative h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={article.image || "/default.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </Link>
                <div className="absolute bottom-5 left-5 text-white">
                  <h2 className="text-lg font-semibold hover:underline">
                    <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <div className="flex items-center text-sm mt-2">
                    <Image
                      src={article.author?.avatar || "/default-avatar.jpg"}
                      alt={article.author?.username || "Unknown"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="ml-2">{article.author?.username || "Unknown"}</span>
                    <div className="w-[1px] h-5 bg-white mx-2" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 Iklan & Terbaru */}
          <AdvBottomHead />
          <LatestNewsReg
            platformId={platformId}
            displayedCategoryArticles={[mainArticle, ...secondaryArticles].filter(Boolean)}
          />
        </>
      )}
    </div>
  );
};

export default RegionalCategoryPage;
