import React from "react";
import MainPopular from "@/components/page-components/popularNews/mainPopular/MainPopular";
import SidePopular from "@/components/page-components/popularNews/sidePopular/SidePopular";
import BottomPopular from "@/components/page-components/popularNews/bottomPopular/BottomPopular";
import popularNews from "@/data/popularNews"; // Import data berita populer

const PopularNews = () => {
  const mainArticle = popularNews[0]; // Berita utama
  const sideArticles = popularNews.slice(1, 3); // 2 berita samping
  const bottomArticles = popularNews.slice(3, 6); // 3 berita di bawah

  return (
    <div className="w-screen bg-gray-800">
      <div className="px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-white mb-2 flex items-center">Most Read</h2>
        <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-10"></div>

        {/* Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MainPopular mainArticle={mainArticle} />
          <SidePopular sideArticles={sideArticles} />
        </div>

        {/* Artikel Bawah */}
        <BottomPopular bottomArticles={bottomArticles} />
      </div>
    </div>
  );
};

export default PopularNews;
