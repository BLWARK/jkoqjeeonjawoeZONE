"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import MostReadCat from "@/components/mostRead/MostReadCat";

const LatestNews = ({ category, displayedCategoryArticles = [] }) => {
  const { getArticlesByCategory, articlesByCategory, articlesByCategoryMeta } =
    useBackContext();

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  const listRef = useRef(null);


  const displayedIds = new Set(
  displayedCategoryArticles
    .filter((article) => article && article.article_id) // pastikan valid
    .map((article) => String(article.article_id))
);


  const categoryMap = {
    entertainment: "ENTERTAINTMENT",
    sport: "SPORT",
    teknologi: "TECHNOLOGY",
    lifestyle: "LIFESTYLE",
    "c-level": "C-LEVEL",
  };

  const realCategory =
    categoryMap[category?.toLowerCase()] || category?.toUpperCase();

  useEffect(() => {
    const fetchArticles = async () => {
      setIsLoading(true);
      await getArticlesByCategory(realCategory, 1, currentPage,);
      setIsLoading(false);
    };

    fetchArticles();
  }, [realCategory, currentPage, getArticlesByCategory]);

 
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [currentPage]);
  

  const allArticles = articlesByCategory[realCategory] || [];
  const meta = articlesByCategoryMeta[realCategory] || {};
  const totalPages = meta.totalPages || 1;

  const filteredArticles = allArticles.filter(
    (article) => !displayedIds.has(String(article.article_id))
  );

  if (isLoading) {
    return (
      <div className="text-center py-10">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto" />
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <p className="text-center py-10">
        Belum ada berita terbaru untuk kategori ini.
      </p>
    );
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🔹 Left Section - Latest News */}
        <div ref={listRef} className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-pink-500 mb-5">Latest News</h2>
          <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

          <div  className="flex flex-col gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.article_id}
                className="flex 2xl:flex-row xl:flex-col lg:flex-col flex-col gap-4 border-b pb-4 items-start"
              >
                <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                  <div className="relative 2xl:w-[300px] w-full 2xl:h-[200px] xl:h-[300px] lg:h-[300px] h-[200px] flex-shrink-0">
                    <Image
                      src={article.image || "/default.jpg"}
                      alt={article.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                </Link>

                <div className="flex-1">
                  <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                    <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                      {article.title}
                    </h3>
                  </Link>

                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    {article.author?.avatar ? (
                      <Image
                        // src={article.author.avatar}
                        src={"/default.jpg"}
                        alt={article.author.fullname}
                        width={30}
                        height={30}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                    )}

                    <span className="ml-2">
                      {article.author?.fullname || "Unknown"}
                    </span>
                    <div className="w-[1px] h-5 bg-gray-300 mx-3"></div>
                    <span>
                      {new Date(article.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 Pagination */}
          <div className="mt-8 flex justify-center gap-2 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const startPage = Math.max(
                1,
                Math.min(currentPage - 1, totalPages - 4)
              );
              const pageNum = startPage + i;

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    pageNum === currentPage
                      ? "bg-pink-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* 🔹 Right Sidebar - Most Read */}
        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-gray-300 2xl:pl-6 xl:pl-6 lg:pl-6">
          <MostReadCat />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
