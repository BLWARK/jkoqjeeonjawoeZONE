import React from 'react'
import Image from "next/image";

const AdvBottomHead = () => {
  return (
    <div className="bg-gray-100 w-full 2xl:h-[200px] h-[150px] rounded-lg overflow-hidden mt-4 relative">
    <Image src="/Banner1.jpg" alt="Advertisement" fill  className="object-cover" priority={true} />
  </div>
  )
}

export default AdvBottomHead