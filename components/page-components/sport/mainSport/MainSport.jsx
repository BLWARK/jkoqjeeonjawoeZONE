import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Import data author
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const MainSport = ({ topArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {topArticles.map((article) => {
        const author = getAuthorById(article.authorId); // ✅ FIX: Pakai `authorId`, bukan `authorIds[0]`
        return (
          <div key={article.id} className="relative w-full">
            {/* Gambar */}
            <div className="relative w-full h-[250px]">
              <Image src={article.image} alt={article.title} fill sizes="100vw" className="rounded-lg object-cover" />
            </div>

            {/* Overlay Judul, Kategori, Author, dan Date */}
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex flex-col justify-end p-4">
              {/* Kategori */}
              {article.category && (
                <span
                  className={`inline-block max-w-max px-3 py-1 text-xs font-semibold text-white rounded mb-2 ${getCategoryColor(article.category[0])}`}
                >
                  {article.category[0]}
                </span>
              )}

              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h2 className="text-white text-lg font-bold leading-tight hover:underline cursor-pointer">
                  {sliceTitle(article.title)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-300 mt-2">
                {author?.photo ? (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{author?.name || "Unknown Author"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MainSport;
