import React from 'react'
import Image from "next/image";

const AdvEditor = () => {
  return (
    <div className="bg-gray-100 w-[380px] 2xl:h-[380px] h-[350px] rounded-lg overflow-hidden relative">
          <Image src="/ads1s.jpg" alt="Advertisement" fill  className="object-contain" />
        </div>
  )
}

export default AdvEditor