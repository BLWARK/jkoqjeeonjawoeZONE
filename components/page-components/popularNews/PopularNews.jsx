"use client";

import React, { useEffect, useState } from "react";
import { useBackContext } from "@/context/BackContext";
import MainPopular from "@/components/page-components/popularNews/mainPopular/MainPopular";
import SidePopular from "@/components/page-components/popularNews/sidePopular/SidePopular";
import BottomPopular from "@/components/page-components/popularNews/bottomPopular/BottomPopular";

const PopularNews = () => {
  const { getArticlesByViews, popularArticles } = useBackContext();
  const [mainArticle, setMainArticle] = useState(null);
  const [sideArticles, setSideArticles] = useState([]);
  const [bottomArticles, setBottomArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 🔵 State untuk loading

  // ✅ Ambil artikel dengan views tertinggi dari backend
  useEffect(() => {
    const fetchPopular = async () => {
      setIsLoading(true);
      await getArticlesByViews(1, 1, 10); // platformId = 1
      setIsLoading(false);
    };

    fetchPopular();
  }, [getArticlesByViews]);

  // ✅ Pisahkan data ke dalam Main, Side, dan Bottom
  useEffect(() => {
    if (popularArticles.length > 0) {
      setMainArticle(popularArticles[0]);
      setSideArticles(popularArticles.slice(1, 3));
      setBottomArticles(popularArticles.slice(3, 6));
    }
  }, [popularArticles]);

  return (
    <div className="w-screen bg-gray-800">
      <div className="2xl:px-0 xl:px-0 lg:px-0 px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-20">
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">
          Most Read
        </h2>
        <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-10"></div>

        {isLoading ? (
          // 🔵 Global Loading Spinner
          <div className="w-full h-[300px] flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Grid Utama */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mainArticle && <MainPopular mainArticle={mainArticle} />}
              {sideArticles.length > 0 && <SidePopular sideArticles={sideArticles} />}
            </div>

            {/* Artikel Bawah */}
            {bottomArticles.length > 0 && <BottomPopular bottomArticles={bottomArticles} />}
          </>
        )}
      </div>
    </div>
  );
};

export default PopularNews;
