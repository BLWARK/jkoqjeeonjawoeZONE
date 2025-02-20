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
        const author = getAuthorById(article.authorIds[0]);
        return (
          <div
            key={article.id}
            className="flex 2xl:flex-col xl:flex-col lg:flex-col flex-row-reverse items-start justify-start"
          >
            {/* Gambar */}
            <div className="relative 2xl:w-full xl:w-full lg:w-full 2xl:h-[160px] w-[140px] h-[100px]">
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
                <h4 className="2xl:text-lg text-md font-semibold hover:underline cursor-pointer">
                  {sliceTitle(article.title)}
                </h4>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center 2xl:text-sm text-[0.7em] text-gray-500 mt-2">
                {author?.photo && (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
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
