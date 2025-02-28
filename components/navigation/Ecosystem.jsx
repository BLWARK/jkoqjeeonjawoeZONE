import React from "react";
import Image from "next/image";

const Ecosystem = () => {
  return (
    <div className="bg-gray-600 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] flex justify-start items-center gap-0 py-6 w-full px-4">
        <div className="text-white mr-5 2xl:text-md xl:text-md lg:text-md text-xs">XYZ Ekosistem:</div>
      {/* Logo LBJ */}
      <a href="https://www.lensaberitajakarta.com" target="blank" className="relative w-[30px] h-[30px]">
        <Image src="/LBJ white.png" alt="LBJ White" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" />
      </a>

      {/* Logo XYZnt */}
      <a href="https://xyznt.io" target="blank" className="relative w-[100px] h-[25px]">
        <Image src="/Logo XYZnt.png" alt="XYZnt Logo" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" />
      </a>

      {/* Logo OneZone TV */}
      <a href="https://www.youtube.com/@XYZoneTV" target="blank" className="relative w-[100px] h-[30px]">
        <Image src="/Logo OneZone TV - White.png" alt="OneZone TV White" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-contain" />
      </a>
    </div>
  );
};

export default Ecosystem;
