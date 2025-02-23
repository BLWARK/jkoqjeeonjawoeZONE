"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Adv from "@/components/page-components/adv-sect/AdvBottomHead"; // Iklan
import MostReadCat from "@/components/mostRead/MostReadCat"; // Most Read
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";
import users from "@/data/users"; // Data author

// 🔹 Gabungkan semua artikel dari berbagai kategori lalu urutkan berdasarkan tanggal terbaru
const allArticles = [
  ...headlines,
  ...News,
  ...cLevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
].sort((a, b) => new Date(b.date) - new Date(a.date)); // ✅ Urutkan berdasarkan tanggal terbaru

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Komponen Utama
const LatestNews = ({ category }) => {
  // 🔹 Filter berita berdasarkan kategori
  const filteredArticles = allArticles
    .filter((article) => article.category.includes(category))
    .slice(0, 20); // Ambil 20 berita terbaru dari kategori terkait

  // 🔹 Jika tidak ada berita, tampilkan pesan kosong
  if (filteredArticles.length === 0) {
    return <p className="text-center py-10">Belum ada berita terbaru.</p>;
  }

  // 🔹 Ambil berita utama (paling pertama) & simpan ID-nya
  const mainArticle = filteredArticles[0];
  const mainArticleId = mainArticle.id;

  // 🔹 Hapus berita utama dari daftar berita lainnya
  const remainingArticles = filteredArticles.filter(
    (article) => article.id !== mainArticleId
  );

  // 🔹 State untuk kontrol jumlah berita yang ditampilkan
  const [visibleCount, setVisibleCount] = useState(6); // Tampilkan 6 berita awal

  // 🔹 Fungsi untuk load more berita
  const loadMoreArticles = () => {
    setVisibleCount((prev) => prev + 4); // Tambahkan 4 berita setiap kali klik
  };

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-10 ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* 🔹 Left Section - Latest News */}
        <div className="lg:col-span-2  ">
          <h2 className="text-3xl font-bold text-pink-500 mb-5">Latest News</h2>
          <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

          {/* 🔹 List Berita Lainnya (Tanpa Berita Utama) */}
          <div className="flex flex-col gap-6">
            {remainingArticles.slice(0, visibleCount).map((article) => {
              const author = getAuthorById(article.authorId);
              return (
                <div
                  key={article.id}
                  className="flex 2xl:flex-row xl:flex-col lg:flex-col flex-col gap-4 border-b pb-4 items-start"
                >
                  {/* Gambar Berita */}
                  <div className="relative 2xl:w-[300px] w-full 2xl:h-[200px] xl:h-[300px] lg:h-[300px]   h-[200px] flex-shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                    
                  {/* Detail Berita */}
                  <div className="flex-1 ">
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
          {visibleCount < remainingArticles.length && (
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
        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-gray-300 2xl:pl-6 xl:pl-6 lg:pl-6 ">
        

          {/* 🔹 Most Read Section */}
          <MostReadCat />
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
