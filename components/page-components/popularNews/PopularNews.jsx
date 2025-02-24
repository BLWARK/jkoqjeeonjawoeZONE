"use client";

import React from "react";
import MainPopular from "@/components/page-components/popularNews/mainPopular/MainPopular";
import SidePopular from "@/components/page-components/popularNews/sidePopular/SidePopular";
import BottomPopular from "@/components/page-components/popularNews/bottomPopular/BottomPopular";
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";

// 🔹 Gabungkan semua artikel dari berbagai kategori
const allArticles = [
  ...headlines,
  ...News,
  ...cLevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Urutkan berita berdasarkan views tertinggi
const sortedArticles = allArticles
  .filter((article) => article.views !== undefined)
  .sort((a, b) => b.views - a.views);

// 🔹 Ambil berita dengan views tertinggi
const mainArticle = sortedArticles[0]; // Berita #1
const sideArticles = sortedArticles.slice(1, 3); // Berita #2 dan #3
const bottomArticles = sortedArticles.slice(3, 6); // Berita #4, #5, dan #6

const PopularNews = () => {
  return (
    <div className="w-screen bg-gray-800">
      <div className="px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">Most Read</h2>
        <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-10"></div>

        {/* Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {mainArticle && <MainPopular mainArticle={mainArticle} />}
          {sideArticles.length > 0 && <SidePopular sideArticles={sideArticles} />}
        </div>

        {/* Artikel Bawah */}
        {bottomArticles.length > 0 && <BottomPopular bottomArticles={bottomArticles} />}
      </div>
    </div>
  );
};

export default PopularNews;
