import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users";
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

const HiburanMain = ({ article }) => {
  if (!article)
    return (
      <p className="text-gray-500 text-center">❌ Tidak ada berita utama.</p>
    );

  // ✅ Fix: Ambil author dengan ID langsung (tanpa map)
  const author = getAuthorById(article.authorId);

  return (
    <div className="w-full relative col-span-1 2xl:col-span-2 xl:col-span-2 lg:col-span-2 order-1 2xl:order-2 xl:order-2 lg:order-2">
      {/* Gambar Besar */}
      <div className="relative w-full h-[400px]">
        {article.image ? (
          <Image
            src={article.image}
            alt={article.title || "No Image Available"}
            fill
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-600">
            ❌ No Image
          </div>
        )}
      </div>

      {/* Judul, Deskripsi, Author */}
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
            article.category[0]
          )}`}
        >
          {article.category[0]}
        </span>
        <Link href={`/artikel/${article.id}/${article.slug}`}>
          <h2 className="text-xl font-bold hover:underline cursor-pointer mt-2">
            {article.title || "No Title"}
          </h2>
        </Link>
        <p className="text-sm text-gray-600 mt-2">
          {article.description || "No Description"}
        </p>

        {/* Author Info */}
        <div className="flex items-center text-sm text-gray-500 mt-2">
          {author?.photo ? (
            <Image
              src={author.photo}
              alt={author.name || "Author Image"}
              width={24}
              height={24}
              className="rounded-full"
            />
          ) : (
            <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          )}
          <span className="ml-2">{author?.name || "Unknown"}</span>
          <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
          <span>{article.date || "No Date"}</span>
        </div>
      </div>
    </div>
  );
};

export default HiburanMain;
