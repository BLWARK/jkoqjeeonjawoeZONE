import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; // Import data author

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 6 kata
const sliceTitle = (title, maxWords = 6) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const SidePopular = ({ sideArticles }) => {
  return (
    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-6">
      {sideArticles.map((article) => {
        const author = getAuthorById(article.authorId); // ✅ FIX: Menggunakan `authorId`, bukan `authorIds[0]`

        return (
          <div key={article.id} className="flex flex-col items-start gap-4">
            {/* Gambar */}
            <div className="relative 2xl:w-[280px] xl:w-[280px] lg:w-[220px] w-full 2xl:h-[300px] h-[250px] flex-shrink-0">
              <Image src={article.image} alt={article.title} fill sizes="100vw" className="rounded-lg object-cover" />
            </div>

            {/* Konten */}
            <div className="flex-1">
              {/* Kategori */}
              <span className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(article.category[0])}`}>
                {article.category[0]}
              </span>

              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h2 className="text-white text-md font-bold leading-tight hover:underline cursor-pointer mt-3">
                  {sliceTitle(article.title, 6)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="mt-4 flex items-center text-sm text-gray-300">
                {author?.photo ? (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">
                  {author?.name || "Unknown Author"} • {article.date}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidePopular;
