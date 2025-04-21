import React from "react";
import Image from "next/image";
import Link from "next/link";

// Fungsi untuk memotong judul menjadi maksimal N kata
const sliceTitle = (title, maxWords = 6) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomTeknologi = ({ bottomArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {bottomArticles.map((article) => {
        const author = article.author;

        return (
          <div
            key={`${article.article_id}-${article.slug}`}
            className="flex items-start gap-4"
          >
            {/* Gambar kecil */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <div className="relative w-[130px] h-[90px] flex-shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="100vw"
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            {/* Detail Berita */}
            <div className="flex flex-col justify-between h-full">
              {/* Judul */}
              <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                <h2 className="text-md font-semibold hover:underline cursor-pointer mt-1">
                  {sliceTitle(article.title, 6)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-300 mt-1 w-full">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.username}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}

                <span className="ml-2">{author?.username || "Unknown Author"}</span>

                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                <span className="2xl:text-md xl:text-md lg:text-xs text-nowrap">
                  {new Date(article.date).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomTeknologi;
