import React from "react";
import MainHead from "@/components/page-components/headline/mainHead/MainHead";
import AddHeadSide from "@/components/page-components/headline/addHeadSide/AddHeadSide";
import AddHeadBottom from "@/components/page-components/headline/addHeadBottom/AddHeadBottom";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";

// 🔹 Gabungkan semua berita
const allArticles = [
 
  ...cLevel,
  ...News,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Filter berita dengan type "headline" dan urutkan berdasarkan tanggal terbaru
const filteredHeadlines = allArticles
  .filter((article) => article.type === "headline")
  .sort((a, b) => new Date(b.date) - new Date(a.date));

// 🔹 Pilih berita utama (1 berita pertama)
const mainHeadline = filteredHeadlines[0];
const mainHeadlineId = mainHeadline?.id;

// 🔹 Pilih berita tambahan di samping (2 berita setelah berita utama)
const sideHeadlines = filteredHeadlines
  .filter((article) => article.id !== mainHeadlineId)
  .slice(0, 2);
const sideHeadlinesIds = sideHeadlines.map((article) => article.id);

// 🔹 Pilih berita tambahan di bawah (sisanya setelah berita utama & samping)
const bottomHeadlines = filteredHeadlines.filter(
  (article) => article.id !== mainHeadlineId && !sideHeadlinesIds.includes(article.id)
);

const Headline = () => {
  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto">
      

      {/* 🔹 Layout Headline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:mt-4 mt-3">
        {/* 🔹 Headline utama */}
        <MainHead headline={mainHeadline} />

        {/* 🔹 Headline tambahan di sisi kanan */}
        <AddHeadSide headlines={sideHeadlines} />
      </div>

      {/* 🔹 Tambahan berita di bawah headline */}
      <AddHeadBottom headlines={bottomHeadlines} />
      <Ads />
    </div>
  );
};

export default Headline;
