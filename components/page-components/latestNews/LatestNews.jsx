"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Clevel from "@/data/cLevel";
import news from "@/data/news";
import sportNews from "@/data/sportNews";
import teknologiNews from "@/data/teknologiData";
import lifestyleNews from "@/data/lifestyleNews";
import entertainmentNews from "@/data/entertainmentNews";
import users from "@/data/users";
import Adv from "@/components/page-components/adv-sect/AdvEditor";
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Gabungkan Semua Data & Urutkan Berdasarkan Tanggal 🔹
const allNews = [...news, ...sportNews, ...teknologiNews, ...lifestyleNews, ...entertainmentNews, ...Clevel,]
  .map((article, index) => ({
    ...article,
    uniqueId: `${article.category[0]}-${article.id}-${index}`, // Tambahkan ID unik agar tidak bentrok
    dateObj: new Date(article.date), // Ubah tanggal ke format Date untuk sorting
  }))
  .sort((a, b) => b.dateObj - a.dateObj); // Urutkan berita dari terbaru ke terlama

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi memotong judul menjadi maksimal 10 kata
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const LatestNews = () => {
  const [visibleNews, setVisibleNews] = useState(4); // Awal tampilkan 4 berita

  const handleLoadMore = () => {
    setVisibleNews((prev) => prev + 4); // Tambah 4 berita setiap klik
  };

  return (
    <div className="w-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-3">
      {/* News List */}
      <div className="2xl:w-[70%] xl:w-[70%] lg:w-[70%] w-full flex flex-col gap-6 2xl:border-r border-gray-300 2xl:pr-8 max-h-[1200px] overflow-y-auto scrollbar-hide">
        <div className="flex justify-between items-center mb-10">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Latest News</h2>
            <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
          </div>
          <a href="/" className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer">
            View All
          </a>
        </div>

        {allNews.slice(0, visibleNews).map((article) => {
          const author = getAuthorById(article.authorId); // ✅ FIX: Pakai `authorId`, bukan `authorIds[0]`
          return (
            <div key={article.uniqueId} className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col-reverse items-start gap-6 border-b border-gray-300 pb-4">
              {/* Konten Berita */}
              <div className="flex-1">
                {/* Kategori */}
                {article.category && (
                  <span className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(article.category[0])}`}>
                    {article.category[0]}
                  </span>
                )}

                {/* Judul Artikel */}
                <Link href={`/artikel/${article.id}/${article.slug}`} passHref>
                  <h2 className="text-lg font-semibold hover:underline cursor-pointer mt-2">
                    {sliceTitle(article.title)}
                  </h2>
                </Link>

                {/* Author & Date */}
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  {author?.photo ? (
                    <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                  ) : (
                    <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                  )}
                  <span className="ml-2">{author?.name || "Unknown Author"}</span>

                  {/* Garis Pemisah */}
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                  {/* Date */}
                  <span>{article.dateObj.toDateString()}</span>
                </div>
              </div>

              {/* Gambar Berita */}
              <div className="relative 2xl:w-[280px] xl:w-[280px] lg:w-[280px] w-full h-[200px] flex-shrink-0 rounded-lg overflow-hidden">
                <Image src={article.image} alt={article.title} fill className="object-cover" />
              </div>
            </div>
          );
        })}

        {/* Load More Button */}
        {visibleNews < allNews.length && (
          <button
            onClick={handleLoadMore}
            className="mt-6 bg-pink-500 text-white py-3 px-5 rounded-lg font-semibold hover:bg-pink-600 transition w-full"
          >
            Load More
          </button>
        )}
      </div>

      {/* Bagian Adv (Tetap di Posisi Tetap, tetapi Ikut Scroll) */}
      <div className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] w-full relative">
        <div className="2xl:sticky top-20">
          <Adv />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
