"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { getCategoryColor } from "@/data/categoryColors";

const MainHead = ({ headline }) => {
  if (!headline) {
    return (
      <div className="w-full h-[300px] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Headline utama belum tersedia.
      </div>
    );
  }

  return (
    <>
      {/* Optional: Manual preload (untuk memastikan preload eksplisit) */}
      <Head>
        <link
          rel="preload"
          as="image"
          href={headline.image}
          imagesrcset={`${headline.image} 1200w`}
          imagesizes="100vw"
        />
      </Head>

      <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-0 w-full h-auto relative">
        <div className="relative w-full h-auto">
          {/* 🔹 Gambar Headline dengan width/height eksplisit */}
          <Image
            src={headline.image || "/default.jpg"}
            alt={headline.title}
            width={1200}
            height={675}
            className="rounded-lg cursor-pointer object-cover w-full h-auto"
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          {/* 🔹 Overlay */}
          <Link href={`/artikel/${headline.article_id}/${headline.slug}`} passHref>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-6 flex flex-col justify-end">
              <h2 className="text-white 2xl:text-3xl text-lg font-bold leading-tight mt-2 hover:underline cursor-pointer">
                {headline.title}
              </h2>

              <p className="text-gray-300 mt-4 2xl:block hidden">
                {headline.description}
              </p>

              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
                {headline.author?.avatar ? (
                  <Image
                    src={headline.author.avatar}
                    alt={headline.author.fullname}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[24px] h-[24px] bg-gray-400 rounded-full"></div>
                )}
                <span className="border-r border-gray-300 pr-2">
                  {headline.author?.fullname || "Unknown"}
                </span>
                <span>
                  {headline.date
                    ? new Date(headline.date).toLocaleDateString("id-ID")
                    : "-"}
                </span>
              </div>
            </div>
          </Link>

          {/* 🔹 Kategori */}
          {headline.category?.length > 0 && (
            <span
              className={`absolute top-4 left-4 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
                headline.category[0]
              )}`}
            >
              {headline.category[0]}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default MainHead;
