"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import MostReadCat from "@/components/mostRead/MostReadCat"; // Most Read
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";
import users from "@/data/users"; // Data author

// 🔹 Gabungkan semua berita dari berbagai kategori
const allArticles = [
  ...headlines,
  ...News,
  ...cLevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Komponen Utama
const LatestNews = ({ category, displayedCategoryArticles = [] }) => {
  // 🔹 Filter berita berdasarkan kategori yang ada di dalam data
  let selectedArticles = allArticles.filter((article) =>
    article.category.includes(category)
  );

  // 🔹 Urutkan berdasarkan tanggal terbaru
  selectedArticles = selectedArticles.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // 🔹 Hapus berita yang sudah tampil di halaman kategori ini
  const displayedIds = new Set(displayedCategoryArticles.map((article) => String(article.id)));
  selectedArticles = selectedArticles.filter(
    (article) => !displayedIds.has(String(article.id))
  );

  // 🔹 Ambil 20 berita terbaru setelah filter
  selectedArticles = selectedArticles.slice(0, 20);

  // 🔹 Jika tidak ada berita, tampilkan pesan kosong
  if (selectedArticles.length === 0) {
    return <p className="text-center py-10">Belum ada berita terbaru untuk kategori ini.</p>;
  }

  // 🔹 State untuk kontrol jumlah berita yang ditampilkan
  const [visibleCount, setVisibleCount] = useState(6); // Tampilkan 6 berita awal

  // 🔹 Fungsi untuk load more berita
  const loadMoreArticles = () => {
    setVisibleCount((prev) => prev + 4); // Tambahkan 4 berita setiap kali klik
  };

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🔹 Left Section - Latest News */}
        <div className="lg:col-span-2">
          <h2 className="text-3xl font-bold text-pink-500 mb-5">Latest News</h2>
          <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

          {/* 🔹 List Berita Lainnya */}
          <div className="flex flex-col gap-6">
            {selectedArticles.slice(0, visibleCount).map((article) => {
              const author = getAuthorById(article.authorId);
              return (
                <div
                  key={article.id}
                  className="flex 2xl:flex-row xl:flex-col lg:flex-col flex-col gap-4 border-b pb-4 items-start"
                >
                  {/* Gambar Berita */}
                  <div className="relative 2xl:w-[300px] w-full 2xl:h-[200px] xl:h-[300px] lg:h-[300px] h-[200px] flex-shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>

                  {/* Detail Berita */}
                  <div className="flex-1">
                    <Link href={`/artikel/${article.id}/${article.slug}`}>
                      <h3 className="text-lg font-semibold hover:underline cursor-pointer">
                        {article.title}
                      </h3>
                    </Link>

                    {/* 🔹 Author & Date Section */}
                    <div className="flex items-center text-sm text-gray-500 mt-2">
                      {/* Foto Author */}
                      {author?.photo ? (
                        <Image
                          src={author.photo}
                          alt={author.name}
                          width={30}
                          height={30}
                          className="rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-[30px] h-[30px] bg-gray-300 rounded-full"></div>
                      )}

                      {/* Nama Author */}
                      <span className="ml-2">{author?.name || "Unknown"}</span>

                      {/* Garis Vertikal Pemisah */}
                      <div className="w-[1px] h-5 bg-gray-300 mx-3"></div>

                      {/* Tanggal */}
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔹 Tombol Load More */}
          {visibleCount < selectedArticles.length && (
            <div className="mt-6 flex justify-center">
              <button
                onClick={loadMoreArticles}
                className="px-6 py-3 text-white bg-pink-500 hover:bg-pink-600 rounded-lg font-semibold"
              >
                Load More
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Right Sidebar - Ads & Most Read */}
        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-gray-300 2xl:pl-6 xl:pl-6 lg:pl-6">
          {/* 🔹 Most Read Section */}
          <MostReadCat />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
