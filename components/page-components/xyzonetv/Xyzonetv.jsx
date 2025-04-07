"use client";

import React from "react";
import videoData from "@/data/videoData";
import Image from "next/image";

const Xyzonetv = () => {
  const mainVideo = videoData[0]; // Video utama
  const sideVideos = videoData.slice(1, 5); // 4 video kecil di sidebar

  return (
    <div className="w-screen bg-gray-800 text-white">
      <div className="px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-20 ">
      <div className="flex justify-start items-center font-bold gap-4 text-[2em] mb-10">
        <Image
          src="/Logo OneZone TV - White.png"
          alt="Judul Video"
          width={200}
          height={100}
          className="object-contain"
        />
      </div>
        <div className="flex flex-col  gap-10 mb-5">
        {/* Bagian Kiri: Video Besar */}
        <div className=" w-full ">
          <div className="w-full aspect-video">
            <iframe
              className="w-full 2xl:h-full xl:h-full lg:h-full h-[300px] rounded-lg"
              src={mainVideo.embedUrl}
              title={mainVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="2xl:flex-row flex-col 2xl:hidden xl:hidden lg:hidden block">
          <h2 className="text-2xl font-bold mt-4">{mainVideo.title}</h2>
          <p className="text-gray-300 text-sm mt-2">{mainVideo.description}</p>
          </div>
        </div>

        {/* Bagian Kanan: Video Kecil */}
        <div className=" w-full 2xl:grid xl:grid lg:grid grid-cols-4 flex-col   gap-6">
          
          {sideVideos.map((video) => (
            <div key={video.id} className="w-full flex flex-col items-start gap-4  pb-6">
                 <div className="w-full relative">
                <iframe
                  className="w-full 2xl:h-[200px] xl:h-full lg:h-[100px] h-[200px] rounded-lg"
                  src={`${video.embedUrl}?modestbranding=3&rel=0&showinfo=0&iv_load_policy=3`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold">{video.title}</h4>
              </div>
             
            </div>
          ))}
        </div>
        </div>
        <a href="https://www.youtube.com/@XYZoneTV/playlists" target="blank" 
        className="mt-8 bg-pink-500 text-white py-3 px-5 rounded-lg font-semibold hover:bg-pink-600 transition w-full text-sm"
        >
        Lihat Video Lainnya
        </a>
      
      </div>
    </div>
  );
};

export default Xyzonetv;
