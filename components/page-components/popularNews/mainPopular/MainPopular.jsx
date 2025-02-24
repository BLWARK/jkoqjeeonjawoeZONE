"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; 
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Gabungkan semua artikel dari berbagai kategori
const allArticles = [
  ...headlines,
  ...News,
  ...cLevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// ✅ Ambil berita dengan views terbanyak
const sortedArticles = allArticles
  .filter((article) => article.views !== undefined) // Pastikan hanya data yang memiliki views
  .sort((a, b) => b.views - a.views); // Urutkan dari views terbesar ke terkecil

const mostViewedArticle = sortedArticles.length > 0 ? sortedArticles[0] : null;

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

// Komponen MainPopular
const MainPopular = ({ mainArticle }) => {
  if (!mainArticle) return null;

  const author = getAuthorById(mainArticle.authorId); 

  return (
    <div className="w-full relative">
      {/* Gambar Utama */}
      <div className="relative w-full h-[350px] md:h-[450px]">
        <Image src={mainArticle.image} alt={mainArticle.title} fill loading="lazy" sizes="100vw" className="rounded-lg object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg p-6 flex flex-col justify-end">
          
          {/* Kategori */}
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(mainArticle.category[0])}`}>
            {mainArticle.category[0]}
          </span>

          {/* Judul */}
          <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`}>
            <h2 className="text-white text-2xl font-bold leading-tight hover:underline cursor-pointer">
              {sliceTitle(mainArticle.title)}
            </h2>
          </Link>

          {/* Author & Date */}
          <div className="mt-2 flex items-center text-sm text-gray-300">
            {author?.photo ? (
              <Image src={author.photo} alt={author.name} width={24} height={24} className="rounded-full" />
            ) : (
              <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
            )}
            <span className="ml-2">{author?.name || "Unknown Author"} • {new Date(mainArticle.date).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ✅ Export Komponen dengan Berita Views Terbanyak
const PopularNewsSection = () => {
  return <MainPopular mainArticle={mostViewedArticle} />;
};

export default PopularNewsSection;
