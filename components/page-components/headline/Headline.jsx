import React from "react";
import MainHead from "@/components/page-components/headline/mainHead/MainHead";
import AdvBottom from "@/components/page-components/adv-sect/AdvBottomHead";
import AddBottomHead from "@/components/page-components/headline/addHeadBottom/AddHeadBottom";
import AddSideHead from "@/components/page-components/headline/addHeadSide/AddHeadSide";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead"

// Fungsi untuk mendapatkan author berdasarkan ID

const Headline = () => {
  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto ">
      <Ads/>
      {/* Headline utama */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 2xl:mt-4 mt-3 ">
        {/* Headline utama */}
        <MainHead />
        {/* Headline tambahan di sisi kanan */}
        <AddSideHead />
      </div>

      {/* Tambahan berita di bawah headline */}
      <AddBottomHead />

      <AdvBottom />
    </div>
  );
};

export default Headline;
