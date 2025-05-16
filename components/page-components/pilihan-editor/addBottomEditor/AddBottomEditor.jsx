"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext"; // ✅ Ambil data dari context
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Fungsi untuk memotong judul (max 10 kata)
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const AddBottomEditor = () => {
  const { editorChoices, getEditorChoices } = useBackContext();
  const [sideArticles, setSideArticles] = useState([]);

  // ✅ Ambil data pilihan editor dari backend
  useEffect(() => {
    if (editorChoices.length === 0) {
      getEditorChoices(1); // platformId = 1
    }
  }, [editorChoices, getEditorChoices]);

  // ✅ Filter hanya yang position = 2, 3, 4
  useEffect(() => {
    if (editorChoices.length > 0) {
      const filtered = editorChoices
        .filter((item) => [2, 3, 4].includes(item.position))
        .map((item) => item.article); // Ambil data artikel
      setSideArticles(filtered);
    }
  }, [editorChoices]);

  if (sideArticles.length === 0) {
    return <p className="text-center text-gray-500 py-10"></p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {sideArticles.map((article) => (
        <div
          key={article.article_id}
          className="flex lg:flex-col 2xl:flex-col xl:flex-col flex-row-reverse items-start justify-start 2xl:border-t-0 xl:border-t-0 lg:border-t-0 border-t border-t-gray-300 2xl:pt-0 xl:pt-0 lg:pt-0 pt-5"
        >
          {/* 🔹 Gambar */}
          <div className="relative w-[140px] h-[100px] lg:w-full lg:h-[160px] 2xl:ml-0 ml-2">
            <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
              <Image
                src={article.image || "/default.jpg"}
                alt={article.title}
                fill
                className="rounded-lg object-cover"
              />
            </Link>
          </div>

          {/* 🔹 Konten Artikel */}
          <div className="mt-3 flex flex-col">
            {/* 🔹 Kategori */}
            {article.category?.length > 0 && (
              <span
                className={`px-3 py-1 text-xs font-semibold text-white rounded max-w-max mb-2 ${
                  getCategoryColor(article.category[0]) || "bg-gray-500"
                }`}
              >
                {article.category[0]}
              </span>
            )}

            {/* 🔹 Judul */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
              <h2 className="text-md font-semibold hover:underline cursor-pointer 2xl:text-lg">
                {sliceTitle(article.title)}
              </h2>
            </Link>

            {/* 🔹 Author & Date */}
            <div className="flex items-center text-gray-500 text-sm mt-2">
              {/* 🔹 Avatar */}
              {article.author?.avatar ? (
                <Image
                  src={article.author.avatar || "/default.jpg"}
                  alt={article.author.fullname}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
              )}
              <span className="ml-2">
                {article.author?.fullname || "Unknown Author"}
              </span>

              {/* 🔹 Garis Pemisah */}
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

              {/* 🔹 Tanggal */}
              <span>
                {article.date
                  ? new Date(article.date).toLocaleDateString("id-ID")
                  : "Tanggal tidak tersedia"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddBottomEditor;
