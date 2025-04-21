"use client";

import React, { useEffect, useState } from "react";
import MainHead from "@/components/page-components/headline/mainHead/MainHead";
import AddHeadSide from "@/components/page-components/headline/addHeadSide/AddHeadSide";
import AddHeadBottom from "@/components/page-components/headline/addHeadBottom/AddHeadBottom";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";
import { useBackContext } from "@/context/BackContext";

const Headline = () => {
  const { headlines, getHeadlines } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Ambil headline saat pertama load
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeadlines(1, "HOME"); // 🔹 Kirim kategori HEADLINE yang diminta backend
      setIsLoading(false);
    };
    fetchData();
  }, [getHeadlines]);
  
  // 🔹 Filter data berdasarkan posisi
  const mainHeadline = headlines.find((item) => item.position === 1)?.article;
  const sideHeadlines = headlines
    .filter((item) => item.position === 2 || item.position === 3)
    .map((item) => item.article);
  const bottomHeadlines = headlines
    .filter((item) => item.position === 4 || item.position === 5)
    .map((item) => item.article);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto">
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          {/* 🔵 Loading Animation */}
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:mt-4 mt-3">
            <MainHead headline={mainHeadline} />
            <AddHeadSide headlines={sideHeadlines} />
          </div>
          <AddHeadBottom headlines={bottomHeadlines} />
          <Ads />
        </>
      )}
    </div>
  );
};

export default Headline;
