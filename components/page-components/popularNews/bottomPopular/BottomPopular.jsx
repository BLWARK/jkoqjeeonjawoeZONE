"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import { useBackContext } from "@/context/BackContext";

// 🔹 Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomPopular = () => {
  const { popularArticles, getArticlesByViews } = useBackContext();
  const [bottomArticles, setBottomArticles] = useState([]);

  // ✅ Ambil artikel dengan views tertinggi ke-4, ke-5, ke-6
  useEffect(() => {
    getArticlesByViews(1, 1, 10);
  }, [getArticlesByViews]);

  useEffect(() => {
    if (popularArticles?.length > 3) {
      // Ambil urutan artikel ke-4, ke-5, ke-6
      setBottomArticles(popularArticles.slice(3, 6));
    }
  }, [popularArticles]);

  if (!bottomArticles.length) return null; // ✅ Jika belum ada data, jangan render apa-apa

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {bottomArticles.map((article) => (
        <div
          key={article.article_id}
          className="flex items-center gap-4 border-t border-t-gray-700 pt-5"
        >
          {/* 🔹 Gambar */}
          <Link href={`/artikel/${article.article_id}/${article.slug}`}>
            <div className="relative w-[130px] h-[100px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="100vw"
                className="rounded-lg object-cover"
              />
            </div>
          </Link>

          {/* 🔹 Konten */}
          <div className="flex-1">
            {/* 🔹 Judul */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <h2 className="text-lg font-semibold hover:underline cursor-pointer text-white">
                {sliceTitle(article.title, 8)}
              </h2>
            </Link>

            {/* 🔹 Author & Date */}
            <div className="flex items-center text-xs text-white mt-1">
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar || "/default.jpg"}
                  alt={article.author.username}
                  width={18}
                  height={18}
                  className="rounded-full"
                />
              ) : (
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              )}
              <span className="ml-2">
                {article.author?.username || "Unknown Author"}
              </span>

              {/* 🔹 Garis Pemisah */}
              <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>

              {/* 🔹 Tanggal */}
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BottomPopular;
