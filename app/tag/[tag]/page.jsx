"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import headlines from "@/data/headline";

import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import users from "@/data/users"; // Data author
import MostReadTag from "@/components/mostRead/MostReadTag"; // Import Most Read

// 🔹 Gabungkan semua artikel dari berbagai kategori
const allArticles = [
  ...headlines,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Urutkan berdasarkan views tertinggi untuk Most Read
const mostReadArticles = allArticles
  .filter((article) => article.views !== undefined)
  .sort((a, b) => b.views - a.views)
  .slice(0, 5); // Ambil 5 berita paling banyak dilihat

// 🔹 Pagination Konfigurasi
const ARTICLES_PER_PAGE = 6;

const TagPage = () => {
  const params = useParams();
  const { tag } = params;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Filter berita berdasarkan tag yang sama persis
  const filteredArticles = allArticles.filter((article) =>
    article.tags?.some((t) => t.toLowerCase().replace(/\s+/g, "-") === tag)
  );

  // 🔹 Hitung jumlah total halaman
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);

  // 🔹 Ambil data berdasarkan halaman saat ini
  const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
  const displayedArticles = filteredArticles.slice(
    startIndex,
    startIndex + ARTICLES_PER_PAGE
  );

  // 🔹 Buat daftar ID yang sudah ditampilkan di tag list
  const displayedArticleIds = new Set(
    displayedArticles.map((article) => article.id)
  );

  // 🔹 Filter berita terbaru agar tidak menampilkan yang sudah ada di tag list
  const latestNewsWithoutTagList = allArticles.filter(
    (article) => !displayedArticleIds.has(article.id)
  );

  // 🔹 Fungsi untuk navigasi halaman
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-8">
      {/* Header */}
      <h2 className="text-3xl font-bold text-pink-500 mb-5">
        Tag: {tag.replace("-", " ")}
      </h2>
      <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

      {/* 🔥 Layout Grid (Kiri: Berita, Kanan: Most Read) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🔹 Bagian Kiri (Berita Berdasarkan Tag) */}
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-1">
          {/* 🔹 4 Berita Pertama (Gambar besar, judul, author, tanggal) */}
          {displayedArticles.slice(0, 4).map((article) => {
            const author = getAuthorById(article.authorId);

            return (
              <div
                key={article.id}
                className="flex flex-col lg:flex-row gap-6 border-b pb-4 border-b-gray-200 mt-4"
              >
                {/* Gambar */}
                <div className="relative w-full lg:w-[300px] h-[150px] ">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }} // Gambar memenuhi wrapper
                    className="rounded-lg"
                  />
                </div>

                {/* Detail Berita */}
                <div className="flex-1 flex-col justify-between">
                  <Link
                    href={`/artikel/${article.id}/${article.slug}`}
                    passHref
                  >
                    <h2 className="text-lg font-bold hover:underline cursor-pointer">
                      {article.title}
                    </h2>
                  </Link>

                  {/* Author & Date */}
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    {author?.photo && (
                      <Image
                        src={author.photo}
                        alt={author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                    )}
                    <span className="ml-2">{author?.name || "Unknown"}</span>
                    <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                    <span>{new Date(article.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* 🔹 Sisa Berita (Hanya Judul & Tanggal) */}
          <div className="grid grid-cols-1  gap-4 mt-4">
            {displayedArticles.slice(4).map((article) => {
              return (
                <div
                  key={article.id}
                  className="border-b pb-2 flex items-center gap-4"
                >
                  {/* Gambar Thumbnail */}
                  <div className="relative w-[120px] h-[80px] flex-shrink-0">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      style={{ objectFit: "cover" }} // Gambar sesuai kontainer
                      className="rounded-lg"
                    />
                  </div>

                  {/* Judul & Tanggal */}
                  <div className="flex-1">
                    <Link
                      href={`/artikel/${article.id}/${article.slug}`}
                      passHref
                    >
                      <h2 className="text-md font-semibold hover:underline cursor-pointer">
                        {article.title}
                      </h2>
                    </Link>
                    <span className="text-sm text-gray-500">
                      {new Date(article.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🔥 Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 text-white rounded-lg ${
                  currentPage === totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Bagian Kanan (Most Read) */}
        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-l-0 border-l-gray-300 2xl:pl-5 xl:pl-5 lg:pl-5 pl-0">
          <MostReadTag />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
