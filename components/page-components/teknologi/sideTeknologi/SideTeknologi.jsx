import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; // Import data author

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const SideTeknologi = ({ sideArticles }) => {
  return (
    <div className="col-span-1 flex flex-col gap-6">
      {sideArticles.map((article) => {
        const author = getAuthorById(article.authorId); // ✅ FIX: Ambil langsung dari `authorId`

        return (
          <div key={article.id} className="flex flex-col">
            {/* Gambar */}
            <div className="relative w-full 2xl:h-[180px] xl:h-[180px] lg:h-[180px] h-[250px]">
              <Image 
                src={article.image} 
                alt={article.title} 
                fill 
                sizes="100vw"
                className="rounded-lg object-cover" 
              />
            </div>

            {/* Kategori */}
            <span 
              className={`inline-block max-w-max px-3 py-1 text-xs font-semibold text-white rounded mt-2 ${getCategoryColor(article.category[0])}`}
            >
              {article.category[0]}
            </span>

            {/* Judul & Author */}
            <div className="mt-2">
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h2 className="text-md font-semibold hover:underline cursor-pointer">
                  {sliceTitle(article.title)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-300 mt-2">
                {author?.photo ? (
                  <Image 
                    src={author.photo} 
                    alt={author.name} 
                    width={20} 
                    height={20} 
                    className="rounded-full" 
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div> // Placeholder jika author tidak punya foto
                )}
                <span className="ml-2">{author?.name || "Unknown Author"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{new Date(article.date).toLocaleDateString()}</span> {/* ✅ Format tanggal */}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideTeknologi;
