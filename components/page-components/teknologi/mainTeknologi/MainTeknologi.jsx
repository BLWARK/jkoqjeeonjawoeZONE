import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; // Import data author

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const MainTeknologi = ({ mainArticle }) => {
  if (!mainArticle) return null;

  const author = getAuthorById(mainArticle.authorIds[0]);

  return (
    <div className="lg:col-span-2 relative">
      <div className="relative w-full 2xl:h-[620px] xl:h-[620px] lg:h-[620px] h-[400px]">
        <Image src={mainArticle.image} alt={mainArticle.title} fill className="rounded-lg object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-end p-6">
          {/* Kategori */}
          <span className={`inline-block px-3 py-1 text-xs max-w-max font-semibold text-white rounded mb-2 ${getCategoryColor(mainArticle.category[0])}`}>
            {mainArticle.category[0]}
          </span>

          {/* Judul */}
          <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`}>
            <h2 className="text-white text-2xl font-bold leading-tight hover:underline cursor-pointer">
              {mainArticle.title}
            </h2>
          </Link>

          {/* Author & Date */}
          <div className="flex items-center text-sm text-gray-300 mt-2">
            {author?.photo && (
              <Image src={author.photo || "/images/default-avatar.png"} alt={author.name || "Unknown"} width={24} height={24} className="rounded-full" />
            )}
            <span className="ml-2">{author?.name || "Unknown Author"}</span>
            <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
            <span>{mainArticle.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTeknologi;
