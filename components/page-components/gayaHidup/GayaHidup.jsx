"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import { useBackContext } from "@/context/BackContext";

// 🔹 Fungsi memotong judul agar tidak terlalu panjang
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const GayaHidup = () => {
  const { getArticlesByCategory, articlesByCategory } = useBackContext();
  const lifestyleArticles = articlesByCategory["LIFESTYLE"] || [];

  useEffect(() => {
    getArticlesByCategory("LIFESTYLE");
  }, []);

  const displayedArticles = lifestyleArticles.slice(0, 8);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-pink-500 mb-3">Lifestyle</h2>
          <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
        </div>
        <a
          href="/lifestyle"
          className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer"
        >
          View All
        </a>
      </div>

      {/* 🔥 Layout dengan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {displayedArticles.map((article) => {
          return (
            <div key={`${article.article_id}-${article.slug}`} className="w-full 2xl:border-b-0 xl:border-b-0 lg:border-b-0 border-b border-b-gray-300 pb-5">
              {/* Gambar */}
              <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                <div className="relative w-full h-[250px] lg:h-[160px]">
                  <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
                </div>
              </Link>

              {/* Kategori */}
              <span
                className={`inline-block max-w-max px-3 py-1 text-xs font-semibold text-white rounded mt-3 ${getCategoryColor(article.category[0])}`}
              >
                {article.category[0]}
              </span>

              {/* Judul */}
              <div className="mt-2">
                <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                  <h2 className="text-md font-semibold hover:underline cursor-pointer">
                    {sliceTitle(article.title)}
                  </h2>
                </Link>
              </div>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {article.author?.avatar ? (
                  <Image src={article.author.avatar} alt={article.author.username} width={20} height={20} className="rounded-full" />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{article.author?.username || "Unknown"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{new Date(article.date).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GayaHidup;
