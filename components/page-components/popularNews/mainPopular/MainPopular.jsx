"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";

// ✅ Komponen MainPopular
const MainPopular = ({ mainArticle }) => {
  if (!mainArticle) return null;

  return (
    <div className="w-full relative">
      {/* Gambar Utama */}
      <div className="relative w-full h-[350px] md:h-[450px]">
        <Image
          src={mainArticle.image}
          alt={mainArticle.title}
          fill
          sizes="100vw"
          className="rounded-lg object-cover"
        />
        <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`}>
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg p-6 flex flex-col justify-end">
            {/* Kategori */}
            {mainArticle.category?.length > 0 && (
              <span
                className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                  mainArticle.category[0]
                )}`}
              >
                {mainArticle.category[0]}
              </span>
            )}

            {/* Judul */}
            <h2 className="text-white text-2xl font-bold leading-tight hover:underline cursor-pointer">
              {mainArticle.title}
            </h2>

            {/* Author & Date */}
            <div className="mt-2 flex items-center text-sm text-gray-300">
              {mainArticle.author?.avatar ? (
                <Image
                  src={mainArticle.author.avatar || "/default-avatar.jpg"}
                  alt={mainArticle.author.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
              )}
              <span className="ml-2">
                {mainArticle.author?.fullname || "Unknown Author"} •{" "}
                {new Date(mainArticle.date).toLocaleDateString("id-ID")}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MainPopular;
