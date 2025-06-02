"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useBackContext } from "@/context/BackContext";
import Image from "next/image";
import Link from "next/link";
import MostReadTag from "@/components/mostRead/MostReadTag";
import { getCategoryColor } from "@/data/categoryColors";

const RegionalIndeksPage = () => {
  const { slug } = useParams();
  const { platformSlugToId, getAllPlatforms, getLatestArticles, latestArticles } = useBackContext();

  const [platformId, setPlatformId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ITEMS_PER_PAGE = 10;

  const articles = latestArticles[platformId] || [];

  const displayRegionName = slug?.replace(/-/g, " ")?.replace(/\b\w/g, c => c.toUpperCase());

  // Ambil platformId dari slug
  // Fetch mapping kalau belum ada
  useEffect(() => {
    if (!platformSlugToId?.[slug]) {
      getAllPlatforms(); // ambil mapping jika belum ada
    }
  }, [slug, getAllPlatforms]);
  
  useEffect(() => {
    const id = platformSlugToId?.[slug];
    if (!id) return;
  
    setPlatformId(id);
    setIsLoading(true);
    getLatestArticles(id, currentPage, ITEMS_PER_PAGE).finally(() => {
      setIsLoading(false);
    });
  }, [platformSlugToId, slug, currentPage, getLatestArticles]);
  
  
  
  
  
  

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const renderPagination = () => (
    <div className="flex justify-center items-center gap-2 mt-6">
      <button
        className={`px-4 py-2 text-sm rounded-lg font-semibold ${
          currentPage > 1
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Prev
      </button>
      <span className="px-4 py-2 text-sm font-semibold">Page {currentPage}</span>
      <button
        className={`px-4 py-2 text-sm rounded-lg font-semibold ${
          articles.length === ITEMS_PER_PAGE
            ? "bg-pink-500 text-white hover:bg-pink-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        disabled={articles.length < ITEMS_PER_PAGE}

      >
        Next
      </button>
    </div>
  );

  const renderArticleCard = (article) => (
    <div
      key={article.article_id}
      className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col-reverse items-start gap-6 border-b border-gray-300 pb-4"
    >
      <div className="flex-1">
        {article.category && (
          <span
            className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
              article.category[0]
            )}`}
          >
            {article.category[0]}
          </span>
        )}
        <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
          <h2 className="text-lg font-semibold hover:underline cursor-pointer mt-2">
            {article.title}
          </h2>
        </Link>
        <div className="flex items-center text-sm text-gray-500 mt-2">
          <Image
            src={article.author?.avatar || "/default.jpg"}
            alt={article.author?.fullname || "Author"}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span className="ml-2">{article.author?.fullname || "Unknown"}</span>
          <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
          <span>{new Date(article.date).toLocaleDateString("id-ID")}</span>
        </div>
      </div>
      <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
        <div className="relative 2xl:w-[280px] xl:w-[280px] lg:w-[280px] w-[390px] h-[200px] flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={article.image || "/default.jpg"}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>
      </Link>
    </div>
  );

  return (
    <div className="w-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-3">
      <div className="2xl:w-[70%] xl:w-[70%] lg:w-[70%] w-full flex flex-col gap-6">
        <div className="flex justify-between items-center mb-3">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Indeks {displayRegionName || "Loading..."}</h2>
            <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full flex justify-center items-center py-10">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {articles.map((article) => renderArticleCard(article))}
            {renderPagination()}
          </>
        )}
      </div>

      <div className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] w-full relative 2xl:pl-8 xl:pl-8 lg:pl-8 2xl:border-l xl:border-l lg:border-l 2xl:border-l-gray-300 xl:border-l-gray-300 lg:border-l-gray-300">
        <div className="2xl:sticky top-20">
          <MostReadTag />
        </div>
      </div>
    </div>
  );
};

export default RegionalIndeksPage;
