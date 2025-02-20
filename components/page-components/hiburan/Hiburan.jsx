import React from "react";
import entertainmentNews from "@/data/entertainmentNews";  
import HiburanLeft from "../../page-components/hiburan/hiburan-left/HiburanLeft";
import HiburanMain from "../../page-components/hiburan/hiburan-main/HiburanMain";
import HiburanRight from "../../page-components/hiburan/hiburan-right/HiburanRight";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead"

const Hiburan = () => {


  const leftArticles = entertainmentNews?.slice(0, 2) || [];  
  const mainArticle = entertainmentNews?.[2] || null;  // ✅ Pastikan artikel tengah ada
  const rightArticles = entertainmentNews?.slice(3, 5) || [];  


  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      <div className="flex w-full justify-between items-center">
        <div className="">
      <h2 className="text-3xl font-bold text-pink-500 flex items-center mb-3">Hiburan</h2>
      <div className="w-[100%] h-[6px] rounded-full bg-pink-500 mb-10"></div>
      </div>
      <a href="/" className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer">View All</a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <HiburanLeft articles={leftArticles} />
        <HiburanMain article={mainArticle}  />
        <HiburanRight articles={rightArticles} />
      </div>
      <Ads/>
    </div>
  );
};

export default Hiburan;
