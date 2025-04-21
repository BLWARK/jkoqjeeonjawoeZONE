"use client";

import React, { useEffect } from "react";
import { useBackContext } from "@/context/BackContext";
import MainTeknologi from "@/components/page-components/teknologi/mainTeknologi/MainTeknologi";
import SideTeknologi from "@/components/page-components/teknologi/sideTeknologi/SideTeknologi";
import BottomTeknologi from "@/components/page-components/teknologi/bottomTeknologi/BottomTeknologi";

const Teknologi = () => {
  const { getArticlesByCategory, articlesByCategory } = useBackContext();
  const teknologiArticles = articlesByCategory["TECHNOLOGY"] || [];

  useEffect(() => {
    getArticlesByCategory("TECHNOLOGY", 1, 6); // Ambil 6 artikel teknologi
  }, []);

  const mainArticle = teknologiArticles[0];
  const sideArticles = teknologiArticles.slice(1, 3);
  const bottomArticles = teknologiArticles.slice(3, 6);

  return (
    <div className="w-screen bg-gray-800 text-white">
      <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-20 px-3">
        <div className="flex w-full justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold text-white flex items-center mb-3">
              Teknologi
            </h2>
            <div className="w-full h-[6px] rounded-full bg-pink-500 mb-10"></div>
          </div>
          <a
            href="/technology"
            className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer"
          >
            View All
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <MainTeknologi mainArticle={mainArticle} />
          <SideTeknologi sideArticles={sideArticles} />
        </div>

        <BottomTeknologi bottomArticles={bottomArticles} />
      </div>
    </div>
  );
};

export default Teknologi;
