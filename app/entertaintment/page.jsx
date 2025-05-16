"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import LatestNews from "@/components/latestNewsCat/LatestNews";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";

// 🔹 Fungsi untuk memotong deskripsi
const sliceDescription = (desc, maxChars = 120) => {
  return desc.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;
};

const EntertainmentPage = () => {
  const { getHeadlines, headlines } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);
  const platformId = 1; // bisa disesuaikan jika dinamis
const data = headlines[platformId] || [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeadlines(1, "ENTERTAINTMENT");
      setIsLoading(false);
    };
    fetchData();
  }, [getHeadlines]);

  // 🔹 Pisahkan berdasarkan posisi
  const mainArticle = data.find((item) => item.position === 1)?.article;
  const secondaryArticles = data
    .filter((item) => [2, 3, 4].includes(item.position))
    .map((item) => item.article);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* 🔹 Headline Utama */}
          {mainArticle && (
            <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
              {mainArticle.image ? (
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-gray-300 animate-pulse" />
              )}

              <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              </Link>

              <div className="absolute bottom-5 left-5 text-white">
                <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                  <h1 className="text-3xl font-bold hover:underline cursor-pointer">
                    {mainArticle.title}
                  </h1>
                </Link>
                <p className="mt-2 text-sm md:text-md text-gray-200">
                  {sliceDescription(mainArticle.description || "")}
                </p>
                <div className="flex items-center text-sm mt-3">
                  <Image
                    src={mainArticle.author?.avatar || "/default-avatar.jpg"}
                    alt={mainArticle.author?.fullname || "Unknown"}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span className="ml-2">{mainArticle.author?.fullname || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-white mx-2" />
                  <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* 🔹 Tiga Berita di Bawahnya */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            {secondaryArticles.map((article) => (
              <div key={article._id} className="relative w-full h-[250px] rounded-lg overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 animate-pulse" />
                )}

                <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </Link>

                <div className="absolute bottom-5 left-5 text-white">
                  <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                    <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                      {article.title}
                    </h2>
                  </Link>
                  <div className="flex items-center text-sm mt-2">
                    <Image
                      src={article.author?.avatar || "/default-avatar.jpg"}
                      alt={article.author?.fullname || "Unknown"}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="ml-2">{article.author?.fullname || "Unknown"}</span>
                    <div className="w-[1px] h-5 bg-white mx-2" />
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 🔹 Iklan & Latest News */}
          <div>
            <Ads />
            <LatestNews
              category="entertainment"
              displayedCategoryArticles={[mainArticle, ...secondaryArticles].filter(Boolean)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EntertainmentPage;
