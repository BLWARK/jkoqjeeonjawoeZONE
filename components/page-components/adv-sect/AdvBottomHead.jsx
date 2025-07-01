"use client";
import React from "react";
import Image from "next/image";
import AdTracker from "@/components/AdTracker"; // pastikan path-nya sesuai dengan lokasi file AdTracker.jsx

const AdvBottomHead = () => {
  return (
    <AdTracker adPosition="bottom_head">
      <div className="bg-gray-100 w-full 2xl:h-[300px] xl:h-[300px] lg:h-[250px] h-[100px] rounded-lg overflow-hidden relative">
        <Image
          src="/1000x200 rgcc.png"
          alt="Advertisement"
          fill
          className="object-contain"
          priority={true}
        />
      </div>
    </AdTracker>
  );
};

export default AdvBottomHead;
