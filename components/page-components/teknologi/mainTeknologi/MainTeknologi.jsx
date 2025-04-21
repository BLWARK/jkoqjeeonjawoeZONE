import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";

const MainTeknologi = ({ mainArticle }) => {
  if (!mainArticle) return null;

  const author = mainArticle.author;

  return (
    <div className="lg:col-span-2 relative">
      <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`}>
        <div className="relative w-full 2xl:h-[620px] xl:h-[620px] lg:h-[620px] h-[400px]">
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            sizes="100vw"
            className="rounded-lg object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex flex-col justify-end p-6">
            {/* Kategori */}
            <span
              className={`inline-block px-3 py-1 text-xs max-w-max font-semibold text-white rounded mb-2 ${getCategoryColor(mainArticle.category[0])}`}
            >
              {mainArticle.category[0]}
            </span>

            {/* Judul */}
            <h2 className="text-white text-2xl font-bold leading-tight hover:underline cursor-pointer">
              {mainArticle.title}
            </h2>

            {/* Author & Date */}
            <div className="flex items-center text-sm text-gray-300 mt-2">
              {author?.avatar ? (
                <Image
                  src={author.avatar}
                  alt={author.username}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              ) : (
                <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
              )}
              <span className="ml-2">{author?.username || "Unknown Author"}</span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(mainArticle.date).toLocaleDateString("id-ID")}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MainTeknologi;
