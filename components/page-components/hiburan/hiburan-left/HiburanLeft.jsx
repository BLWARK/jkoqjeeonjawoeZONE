import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const HiburanLeft = ({ articles = [] }) => {
  return (
    <div className="col-span-1 flex flex-col gap-6 order-2 2xl:order-1">
      {articles.map((article) => (
        <div key={`${article.article_id}-${article.slug}`} className="flex flex-col">
          {/* Gambar Artikel */}
          <Link href={`/artikel/${article.article_id}/${article.slug}`}>
            <div className="relative w-full 2xl:h-[180px] h-[250px]">
              <Image 
                src={article.image} 
                alt={article.title || "No Image Available"} 
                fill 
                className="rounded-lg object-cover" 
              />
            </div>
          </Link>

          {/* Detail Artikel */}
          <div className="mt-2">
            {/* Kategori */}
            <span
              className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                article.category?.[0]
              )}`}
            >
              {article.category?.[0]}
            </span>

            {/* Judul Artikel */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <h2 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                {sliceTitle(article.title)}
              </h2>
            </Link>

            {/* Author & Date */}
            <div className="flex items-center text-sm text-gray-500 mt-2">
              {article.author?.avatar ? (
                <Image 
                  src={article.author.avatar} 
                  alt={article.author.fullname}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
              )}
              <span className="ml-2">{article.author?.fullname || "Unknown Author"}</span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HiburanLeft;
