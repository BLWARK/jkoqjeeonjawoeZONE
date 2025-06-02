"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import { useBackContext } from "@/context/BackContext";

// 🔹 Fungsi untuk memotong judul menjadi maksimal 6 kata
const sliceTitle = (title, maxWords = 6) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const SidePopular = () => {
  const { popularArticles, getArticlesByViews } = useBackContext();
  const [sideArticles, setSideArticles] = useState([]);

  // ✅ Ambil artikel dengan views tertinggi ke-2 dan ke-3
  useEffect(() => {
    getArticlesByViews(1, 1, 10);
  }, [getArticlesByViews]);

  useEffect(() => {
    if (popularArticles?.length > 1) {
      // Ambil urutan artikel ke-2 dan ke-3
      setSideArticles(popularArticles.slice(1, 3));
    }
  }, [popularArticles]);

  if (!sideArticles.length) return null; // ✅ Jika belum ada data, jangan render apa-apa

  return (
    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-6  ">
      {sideArticles.map((article) => (
        <div key={article.article_id} className="flex flex-col items-start gap-4">
          {/* 🔹 Gambar */}
          <Link href={`/artikel/${article.article_id}/${article.slug}`}>
            <div className="relative 2xl:w-[280px] xl:w-[280px] lg:w-[220px] w-[410px]  2xl:h-[300px] xl:h-[300px] lg:h-[300px] h-[240px] ">
              <Image
                src={article.image}
                alt={article.title}
                fill
                
                className="rounded-lg object-cover"
              />
            </div>
          </Link>

          {/* 🔹 Konten */}
          <div className="flex-1">
            {/* 🔹 Kategori */}
            {article.category?.[0] && (
              <span
                className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                  article.category[0]
                )}`}
              >
                {article.category[0]}
              </span>
            )}

            {/* 🔹 Judul */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <h2 className="text-white text-md font-bold leading-tight hover:underline cursor-pointer mt-3">
                {sliceTitle(article.title, 6)}
              </h2>
            </Link>

            {/* 🔹 Author & Date */}
            <div className="mt-4 flex items-center text-sm text-gray-300">
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar || "/default.jpg"}
                  alt={article.author.fullname}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
              )}
              <span className="ml-2">
                {article.author?.fullname || "Unknown Author"} | {" "}
                {new Date(article.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SidePopular;
