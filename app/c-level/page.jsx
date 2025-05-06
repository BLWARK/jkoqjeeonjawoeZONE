"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";
import LatestNews from "@/components/latestNewsCat/LatestNews";

// 🔹 Fungsi untuk memotong deskripsi
const sliceDescription = (desc, maxChars = 120) =>
  desc?.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;

const CLevelPage = () => {
  const { getHeadlines, headlines } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);
  const platformId = 1; // bisa disesuaikan jika dinamis
  const data = headlines[platformId] || [];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeadlines(1, "C-LEVEL");
      setIsLoading(false);
    };
    fetchData();
  }, [getHeadlines]);

  const mainArticle = data.find((item) => item.position === 1)?.article;

  const secondaryArticles = data
    .filter((item) => [2, 3, 4].includes(item.position))
    .sort((a, b) => a.position - b.position)
    .map((item) => item.article);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          {/* 🔹 Layout Utama (Kiri & Kanan) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 🔹 Bagian Kiri - Berita Utama */}
            {mainArticle && (
              <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden">
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                <div className="absolute bottom-5 left-5 text-white">
                  <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                    <h1 className="text-3xl font-bold hover:underline cursor-pointer">
                      {mainArticle.title}
                    </h1>
                  </Link>
                  <p className="mt-2 text-sm">{sliceDescription(mainArticle.description)}</p>
                  <div className="flex items-center text-sm mt-2">
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

            {/* 🔹 Bagian Kanan - 3 Berita Lainnya */}
            <div className="flex flex-col gap-4">
              {/* 1 Berita Besar di Atas */}
              {secondaryArticles[0] && (
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src={secondaryArticles[0].image}
                    alt={secondaryArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  <div className="absolute bottom-5 left-5 text-white">
                    <Link href={`/artikel/${secondaryArticles[0].article_id}/${secondaryArticles[0].slug}`} passHref>
                      <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                        {secondaryArticles[0].title}
                      </h2>
                    </Link>
                    <div className="flex items-center text-sm mt-2">
                      <Image
                        src={secondaryArticles[0].author?.avatar || "/default-avatar.jpg"}
                        alt={secondaryArticles[0].author?.username || "Unknown"}
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <span className="ml-2">{secondaryArticles[0].author?.username || "Unknown"}</span>
                      <div className="w-[1px] h-5 bg-white mx-2" />
                      <span>{new Date(secondaryArticles[0].date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* 2 Berita Kotak di Bawah */}
              <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4">
                {secondaryArticles.slice(1).map((article) => (
                  <div key={article._id} className="relative w-full h-[250px] rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    </Link>
                    <div className="absolute bottom-3 left-3 text-white">
                      <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                        <h3 className="text-sm font-semibold hover:underline cursor-pointer">
                          {article.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔹 Iklan */}
          <Ads />

          {/* 🔹 Latest News */}
          <LatestNews
            category="c-level"
            displayedCategoryArticles={[mainArticle, ...secondaryArticles].filter(Boolean)}
          />
        </>
      )}
    </div>
  );
};

export default CLevelPage;
