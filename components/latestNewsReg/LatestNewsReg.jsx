"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Adv from "@/components/page-components/adv-sect/AdvEditor";
import MostReadCat from "@/components/mostRead/MostReadCat";
import { getCategoryColor } from "@/data/categoryColors";
import { useBackContext } from "@/context/BackContext";

const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : title;
};

// ✅ Bisa menerima prop platformId dari luar
const LatestNews = ({ platformId: propPlatformId }) => {
  const {
    getLatestArticles,
    latestArticles,
    selectedPortal,
    platformIdToSlug,
    getAllPlatforms,
  } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);

  const platformId = propPlatformId || selectedPortal?.platform_id || 1;
  const slug = platformIdToSlug?.[platformId];

  const articles = latestArticles?.[platformId] || [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getLatestArticles(platformId);
      setIsLoading(false);
    };
    fetchData();
  }, [getLatestArticles, platformId]);

  useEffect(() => {
    if (!platformIdToSlug?.[platformId]) {
      getAllPlatforms(); // pastikan mapping slug ↔ id tersedia
    }
  }, [platformId, platformIdToSlug, getAllPlatforms]);
  

  return (
    <div className="w-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-3">
      <div className="2xl:w-[70%] xl:w-[70%] lg:w-[70%] w-full flex flex-col gap-6 2xl:border-r border-gray-300 2xl:pr-8">
        <div className="flex justify-between items-center mb-6">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">
              Latest News
            </h2>
            <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
          </div>
        </div>

        {isLoading ? (
          <div className="w-full h-[200px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {articles.map((article, index) => {
              const author = article.author || {};
              return (
                <div
                  key={`${article.article_id}-${index}`}
                  className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col-reverse items-start gap-6 border-b border-gray-300 pb-4"
                >
                  <div className="flex-1">
                    {article.category?.[0] && (
                      <span
                        className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                          article.category[0]
                        )}`}
                      >
                        {article.category[0]}
                      </span>
                    )}
                    <Link
                      href={`/artikel/${article.article_id}/${article.slug}`}
                      passHref
                    >
                      <h2 className="text-lg font-semibold hover:underline cursor-pointer mt-2">
                        {sliceTitle(article.title)}
                      </h2>
                    </Link>
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      {author.avatar ? (
                        <Image
                          src={author.avatar}
                          alt={author.fullname}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                      ) : (
                        <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                      )}
                      <span className="ml-2">
                        {author.fullname || "Unknown Author"}
                      </span>
                      <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                      <span>
                        {new Date(article.date).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={`/artikel/${article.article_id}/${article.slug}`}
                    passHref
                  >
                    <div className="relative 2xl:w-[280px] xl:w-[280px] lg:w-[280px] w-full h-[200px] flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </Link>
                </div>
              );
            })}
            {slug ? (
              <a
                href={`/regional/${slug}/indeks`}
                className="text-nowrap 2xl:w-[200px] xl:w-[200px] lg:w-[200px] w-full font-semibold bg-pink-500 flex justify-center items-center text-white px-6 py-3 text-md rounded-lg cursor-pointer"
              >
                Lihat Semua
              </a>
            ) : (
              <div className="text-center text-sm text-gray-400 italic">
                Menyiapkan routing...
              </div>
            )}
          </>
        )}
      </div>

      {/* Bagian Adv */}
      <div className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] w-full relative">
        <div className="2xl:sticky top-20">
          <MostReadCat />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
