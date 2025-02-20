import React from "react";
import MainTeknologi from "@/components/page-components/teknologi/mainTeknologi/MainTeknologi";
import SideTeknologi from "@/components/page-components/teknologi/sideTeknologi/SideTeknologi";
import BottomTeknologi from "@/components/page-components/teknologi/bottomTeknologi/BottomTeknologi";
import teknologiNews from "@/data/teknologiData"; // Import data berita teknologi

const Teknologi = () => {
  const mainArticle = teknologiNews[0]; // Berita utama
  const sideArticles = teknologiNews.slice(1, 3); // 2 berita di kanan
  const bottomArticles = teknologiNews.slice(3, 6); // 3 berita di bawah

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      <div className="flex w-full justify-between items-center">
        <div className="">
      <h2 className="text-3xl font-bold text-pink-500 flex items-center mb-3">Teknologi</h2>
      <div className="w-[100%] h-[6px] rounded-full bg-pink-500 mb-10"></div>
      </div>
      <a href="/" className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer">View All</a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MainTeknologi mainArticle={mainArticle} />
        <SideTeknologi sideArticles={sideArticles} />
      </div>
        <BottomTeknologi bottomArticles={bottomArticles} />
    </div>
  );
};

export default Teknologi;
