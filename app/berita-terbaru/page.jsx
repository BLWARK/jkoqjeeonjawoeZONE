"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MostReadTag from "@/components/mostRead/MostReadTag"; // Komponen Most Read
import Clevel from "@/data/cLevel";
import news from "@/data/news";
import sportNews from "@/data/sportNews";
import teknologiNews from "@/data/teknologiData";
import lifestyleNews from "@/data/lifestyleNews";
import entertainmentNews from "@/data/entertainmentNews";
import users from "@/data/users";
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Gabungkan Semua Data & Urutkan Berdasarkan Tanggal 🔹
const allNews = [...news, ...sportNews, ...teknologiNews, ...lifestyleNews, ...entertainmentNews, ...Clevel,]
  .map((article, index) => ({
    ...article,
    uniqueId: `${article.category[0]}-${article.id}-${index}`,
    dateObj: new Date(article.date),
  }))
  .sort((a, b) => b.dateObj - a.dateObj); // Urutkan berita terbaru ke lama

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi memotong judul menjadi maksimal 10 kata
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const Page = () => {
  const itemsPerPage = 6; // ✅ 6 berita per halaman
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(allNews.length / itemsPerPage);

  // 🔹 Scroll ke atas ketika halaman berubah
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Ambil berita sesuai halaman saat ini
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleNews = allNews.slice(startIndex, startIndex + itemsPerPage);

  // 🔹 Logika rentang angka untuk pagination
  const getPageNumbers = () => {
    let range = [];
    const maxButtons = 5;
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxButtons - 1);

    if (end - start < maxButtons - 1) {
      start = Math.max(1, end - maxButtons + 1);
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="w-full flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-10 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-3">
      {/* 🔹 Kiri: News List */}
      <div className="2xl:w-[70%] xl:w-[70%] lg:w-[70%] w-full flex flex-col gap-6">
        <div className="flex justify-between items-center mb-3">
          <div className="w-full">
            <h2 className="text-3xl font-bold text-pink-500 mb-3">Latest News</h2>
            <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
          </div>
        </div>

        {/* ✅ Hanya Menampilkan 6 Berita Sesuai Halaman */}
        {visibleNews.map((article) => {
          const author = getAuthorById(article.authorId);
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

        {/* 🔹 Pagination */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {/* Tombol Prev */}
          <button
            className={`px-4 py-2 text-sm rounded-lg font-semibold ${
              currentPage > 1 ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {/* Rentang Angka */}
          {getPageNumbers().map((num) => (
            <button
              key={num}
              className={`px-3 py-2 text-sm font-semibold rounded-lg ${
                currentPage === num ? "bg-pink-500 text-white" : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          {/* Tombol Next */}
          <button
            className={`px-4 py-2 text-sm rounded-lg font-semibold ${
              currentPage < totalPages ? "bg-pink-500 text-white hover:bg-pink-600" : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* 🔹 Kanan: Komponen Most Read */}
      <div className="2xl:w-[30%] xl:w-[30%] lg:w-[30%] w-full relative 2xl:pl-8 xl:pl-8 lg:pl-8 border-l border-l-gray-300">
        <div className="2xl:sticky top-20">
          <MostReadTag />
        </div>
      </div>
    </div>
  );
};

export default Page;
