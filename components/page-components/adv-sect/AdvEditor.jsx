import React from 'react'
import Image from "next/image";
import AdTracker from "@/components/AdTracker";

const AdvEditor = () => {
  return (
    <AdTracker adPosition="editor_head">
    <div className="bg-gray-100 2xl:w-[380px] xl:w-[380px] lg:w-[320px] 2xl:h-[380px] xl:h-[380px] lg:h-[320px] h-[350px] rounded-lg overflow-hidden relative">
          <Image src="/Ads1s.jpg" alt="Advertisement" fill  className="object-contain" />
        </div>
        </AdTracker>
  )
}

export default AdvEditor