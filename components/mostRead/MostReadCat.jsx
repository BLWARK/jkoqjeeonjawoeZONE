"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import AdsMostRead from "@/components/page-components/adv-sect/AdvMostRead";

const MostReadCat = ({ platformId }) => {
  const { getArticlesByViews, popularArticles } = useBackContext();

     useEffect(() => {
     if (platformId) {
       getArticlesByViews(platformId);
     }
   }, [getArticlesByViews, platformId]);

  const articles = popularArticles.slice(0, 5); // Tampilkan hanya 5

  return (
    <div className="w-full flex flex-col gap-6">
      <AdsMostRead />
      <h2 className="text-2xl font-bold text-pink-500">Most Read</h2>
      <div className="w-[50%] h-[5px] bg-pink-500 mb-5 rounded-full"></div>
      <div className="flex flex-col gap-4">
        {articles.map((news) => (
          <div
            key={`${news.article_id}-most-read`}
            className="flex flex-col border-b border-gray-300 py-3"
          >
            <Link href={`/artikel/${news.article_id}/${news.slug}`}>
              <div className="relative w-full 2xl:h-[200px] h-[250px]">
                <Image
                  src={news.image || "/default.jpg"}
                  alt={news.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            <div className="mt-2">
              <Link href={`/artikel/${news.article_id}/${news.slug}`}>
                <h4 className="text-md font-semibold hover:underline cursor-pointer">
                  {news.title}
                </h4>
              </Link>
            </div>

            <div className="flex items-center text-sm text-gray-500 mt-2">
              {news.author?.avatar ? (
                <Image
                  src={news.author.avatar}
                  alt={news.author.fullname || "Unknown"}
                  width={20}
                  height={20}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-400 rounded-full" />
              )}
              <span className="ml-2">
                {news.author?.fullname || "Unknown Author"}
              </span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostReadCat;
