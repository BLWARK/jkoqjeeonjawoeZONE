"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import AdsMostRead from "@/components/page-components/adv-sect/AdvMostRead";
import AdsMostRead2 from "@/components/page-components/adv-sect/AdvMostRead2";

const MostReadTag = () => {
  const { getArticlesByViews, popularArticles } = useBackContext();

  useEffect(() => {
    getArticlesByViews(1, 1, 10); // platformId = 1, page = 1, limit = 10
  }, [getArticlesByViews]);

  const mostReadArticles = popularArticles.slice(0, 5);

  return (
    <div className="w-full flex flex-col gap-6">
      <AdsMostRead />
      <AdsMostRead2 />

      <h2 className="text-2xl font-bold text-pink-500">Most Read</h2>
      <div className="w-[50%] h-[5px] bg-pink-500 mb-5 rounded-full"></div>

      <div className="flex flex-col gap-4">
        {mostReadArticles.map((news) => (
          <div key={`${news.article_id}-most-read`} className="flex flex-col border-b border-gray-300 py-3">
            {/* Gambar */}
            <Link href={`/artikel/${news.article_id}/${news.slug}`} passHref>
              <div className="relative w-full 2xl:h-[200px] h-[250px]">
                <Image
                  src={news.image || "/default.jpg"}
                  alt={news.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            {/* Judul */}
            <div className="mt-2">
              <Link href={`/artikel/${news.article_id}/${news.slug}`} passHref>
                <h4 className="text-md font-semibold hover:underline cursor-pointer">
                  {news.title}
                </h4>
              </Link>
            </div>

            {/* Author & Date */}
            <div className="flex items-center text-sm text-gray-500 mt-2">
              {news.author?.avatar ? (
                <Image
                  src={news.author.avatar}
                  alt={news.author.username || "Unknown"}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
              )}
              <span className="ml-2">{news.author?.username || "Unknown Author"}</span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostReadTag;