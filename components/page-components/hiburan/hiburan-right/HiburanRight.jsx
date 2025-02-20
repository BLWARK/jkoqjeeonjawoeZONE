import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Hanya untuk mendapatkan data author
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const HiburanRight = ({ articles = [] }) => {  // ✅ Menerima data dari props
  return (
    <div className="col-span-1 flex flex-col gap-6 order-3 2xl:order-3 xl:order-3 lg:order-3">
      {articles.map((article) => {
        // ✅ Fix: Gunakan `authorId`, bukan `authorIds`
        const author = getAuthorById(article.authorId);

        return (
          <div key={article.id} className="flex flex-col">
            {/* Gambar Artikel */}
            <div className="relative w-full 2xl:h-[180px] h-[250px]">
              <Image 
                src={article.image} 
                alt={article.title || "No Image Available"} 
                fill
                className="rounded-lg object-cover" 
              />
            </div>

            {/* Detail Artikel */}
            <div className="mt-2">
              {/* Kategori */}
              <span
                className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                  article.category[0]
                )}`}
              >
                {article.category[0]}
              </span>

              {/* Judul Artikel */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h4 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                  {article.title}
                </h4>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {author?.photo ? (
                  <Image 
                    src={author.photo} 
                    alt={author.name || "Unknown Author"} 
                    width={20} 
                    height={20} 
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
                <span className="ml-2">{author?.name || "Unknown"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{article.date || "No Date"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HiburanRight;
