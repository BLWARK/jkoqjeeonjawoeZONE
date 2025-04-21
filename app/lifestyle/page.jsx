"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import Ads from '@/components/page-components/adv-sect/AdvBottomHead';
import LatestNews from "@/components/latestNewsCat/LatestNews";

const LifestylePage = () => {
  const { getHeadlines, headlines } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeadlines(1, "LIFESTYLE");
      setIsLoading(false);
    };
    fetchData();
  }, [getHeadlines]);

  const mainArticle = headlines.find((item) => item.position === 1)?.article;
  const rightArticles = headlines
    .filter((item) => item.position === 2 || item.position === 3)
    .map((item) => item.article);
  const bottomArticles = headlines
    .filter((item) => item.position === 4 || item.position === 5)
    .map((item) => item.article);

  if (isLoading) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!mainArticle) {
    return <p className="text-center py-10">Belum ada berita Lifestyle.</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🔵 TENGAH: Berita Utama */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border col-span-2">
          <Image
            src={mainArticle.image || "/default.jpg"}
            alt={mainArticle.title}
            fill
            className="object-cover"
          />
          <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5 flex flex-col justify-end">
              <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                {mainArticle.title}
              </h2>
              <div className="flex items-center text-sm text-white mt-2">
                {mainArticle.author?.avatar && (
                  <Image
                    src={mainArticle.author.avatar}
                    alt={mainArticle.author.username}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                )}
                <span className="ml-2">{mainArticle.author?.username || "Unknown"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
              </div>
            </div>
          </Link>
        </div>

        {/* 🟠 KANAN: 2 Berita */}
        <div className="flex gap-4 col-span-1">
          {rightArticles.map((article) => (
            <div key={article._id} className="flex flex-col gap-2">
              <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                <div className="relative w-full h-[200px]">
                  <Image
                    src={article.image || "/default.jpg"}
                    alt={article.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </Link>
              <div className="flex flex-col">
                <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                  <h3 className="text-lg font-semibold mt-2 hover:underline cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  {article.author?.avatar && (
                    <Image
                      src={article.author.avatar}
                      alt={article.author.username}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="ml-2">{article.author?.username || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🟢 bawah: 2 Berita */}
      <div className="grid 2xl:grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-6 mt-6">
        {bottomArticles.map((article) => (
          <div key={article._id} className="flex flex-col border-b pb-4">
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <div className="relative w-full h-[230px]">
                <Image
                  src={article.image || "/default.jpg"}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <h3 className="text-lg font-semibold mt-2 hover:underline cursor-pointer">
                {article.title}
              </h3>
            </Link>
            <div className="flex items-center text-sm text-gray-500 mt-2">
              {article.author?.avatar && (
                <Image
                  src={article.author.avatar}
                  alt={article.author.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="ml-2">{article.author?.username || "Unknown"}</span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <Ads />
      <LatestNews category="lifestyle" displayedCategoryArticles={[mainArticle, ...rightArticles, ...bottomArticles]} />
    </div>
  );
};

export default LifestylePage;