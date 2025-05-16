import React from "react";
import Image from "next/image";
import Link from "next/link";

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomSport = ({ bottomArticles }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {bottomArticles.map((article) => {
        const author = article.author;

        return (
          <div key={`${article.article_id}-${article.slug}`} className="flex items-start gap-4">
            {/* Gambar kecil */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <div className="relative w-[150px] h-[100px] flex-shrink-0">
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
            <div className="flex-1">
              {/* Judul */}
              <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                <h2 className="text-md font-semibold hover:underline cursor-pointer">
                  {sliceTitle(article.title, 8)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-1">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.fullname}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{author?.fullname || "Unknown Author"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{new Date(article.date).toLocaleDateString("id-ID")}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomSport;
