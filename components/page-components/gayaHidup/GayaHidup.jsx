import React from "react";
import Image from "next/image";
import Link from "next/link";
import lifestyleNews from "@/data/lifestyleNews"; // Data berita gaya hidup
import users from "@/data/users"; // Data author
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// 🔹 Fungsi memotong judul agar tidak terlalu panjang
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const GayaHidup = () => {
  // Ambil 4 berita pertama dari lifestyleNews
  const displayedArticles = lifestyleNews.slice(0, 4);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-pink-500 mb-3">Lifestyle</h2>
          <div className="w-[10%] h-[6px] rounded-full bg-pink-500"></div>
        </div>
        <a
          href="/"
          className="text-nowrap font-semibold bg-pink-500 flex justify-center items-center text-white px-4 py-3 text-xs rounded-lg cursor-pointer"
        >
          View All
        </a>
      </div>

      {/* 🔥 Layout dengan Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  ">
        {displayedArticles.map((article) => {
          const author = getAuthorById(article.authorId);

          return (
            <div key={article.id} className="w-full 2xl:border-b-0 xl:border-b-0 lg:border-b-0 border-b border-b-gray-300 2xl:pb-0 xl:pb-0 lg:pb-0 pb-5 ">
              {/* Gambar */}
              <div className="relative w-full h-[250px] lg:h-[160px]">
                <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
              </div>

              {/* Kategori */}
              <span
                className={`inline-block max-w-max px-3 py-1 text-xs font-semibold text-white rounded mt-3 ${getCategoryColor(article.category[0])}`}
              >
                {article.category[0]}
              </span>

              {/* Judul */}
              <div className="mt-2">
                <Link href={`/artikel/${article.id}/${article.slug}`}>
                  <h2 className="text-md font-semibold hover:underline cursor-pointer">
                    {sliceTitle(article.title)}
                  </h2>
                </Link>
              </div>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {author?.photo ? (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{author?.name || "Unknown"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{article.date}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GayaHidup;
