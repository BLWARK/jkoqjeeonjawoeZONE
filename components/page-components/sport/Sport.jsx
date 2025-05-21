"use client";

import React, { useEffect } from "react";
import { useBackContext } from "@/context/BackContext";
import MainSport from "../sport/mainSport/MainSport";
import BottomSport from "../sport/bottomSport/BottomSport";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead"

const Sport = () => {
  const { getArticlesByCategory, articlesByCategory } = useBackContext();
  const sportArticles = articlesByCategory["SPORT"] || [];

  useEffect(() => {
    getArticlesByCategory("SPORT"); // Ambil 6 artikel teknologi
  }, []);

  const topArticles = sportArticles.slice(0, 4); // 4 berita utama (grid 2x2)
  const bottomArticles = sportArticles.slice(4, 7); // 3 berita tambahan (horizontal)

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      {/* Header */}
      <div className="flex w-full justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-pink-500 flex items-center mb-3">Olahraga</h2>
          <div className="w-[100%] h-[6px] rounded-full bg-pink-500 mb-10"></div>
        </div>
        <a
          href="/sport"
          className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer"
        >
          View All
        </a>
      </div>

      {/* Grid 2x2 untuk 4 Berita Utama */}
      <MainSport topArticles={topArticles} />

      {/* Berita Tambahan (Orientasi Horizontal) */}
      <BottomSport bottomArticles={bottomArticles} />
      <div className="mt-10">
      <Ads/>
      </div>
    </div>
  );
};

export default Sport;
