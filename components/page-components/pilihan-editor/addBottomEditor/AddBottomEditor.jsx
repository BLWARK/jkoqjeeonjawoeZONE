import React from "react";
import Image from "next/image";
import Link from "next/link";
import PilihanEditor from "@/data/EditorChoice";
import users from "@/data/users";
import { getCategoryColor } from "@/data/categoryColors";

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 10 kata
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const AddBottomEditor = () => {
  const sideArticles = PilihanEditor.slice(1, 4); // Artikel tambahan

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {sideArticles.map((article) => {
        const author = getAuthorById(article.authorId); // FIX: Langsung ambil authorId tanpa array

        return (
          <div
            key={article.id}
            className="flex  lg:flex-col 2xl:flex-col xl:flex-col flex-row-reverse items-start justify-start 2xl:border-t-0 xl:border-t-0 lg:border-t-0 border-t border-t-gray-300 2xl:pt-0 xl:pt-0 lg:pt-0 pt-5"
          >
            {/* Gambar */}
            <div className="relative w-[140px] h-[100px] lg:w-full lg:h-[160px] 2xl:ml-0 ml-2">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>

            {/* Konten Artikel */}
            <div className="mt-3 flex flex-col">
              {/* Kategori */}
              {article.category && (
                <span
                  className={`px-3 py-1 text-xs font-semibold text-white rounded max-w-max mb-2 ${getCategoryColor(article.category[0])}`}
                >
                  {article.category[0]}
                </span>
              )}

              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`} passHref>
                <h2 className="text-md font-semibold hover:underline cursor-pointer 2xl:text-lg">
                  {sliceTitle(article.title)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-gray-500 text-sm mt-2">
                {author?.photo ? (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
                <span className="ml-2">{author?.name || "Unknown Author"}</span>

                {/* Garis pemisah */}
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

export default AddBottomEditor;
