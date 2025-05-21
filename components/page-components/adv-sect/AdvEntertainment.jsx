import React from 'react'
import Image from "next/image";

const AdvEntertainment = () => {
  return (
    <div className="bg-gray-100 w-full 2xl:h-[300px] xl:h-[300px]  lg:h-[250px] h-[100px] rounded-lg overflow-hidden  relative ">
    <Image src="/banner-sponsor-crw.webp" alt="Advertisement" fill  className="object-contain" priority={true} />
  </div>
  )
}

export default AdvEntertainment