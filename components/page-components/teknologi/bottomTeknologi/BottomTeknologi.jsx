import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Import data author

const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const sliceTitle = (title, maxWords = 6) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomTeknologi = ({ bottomArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      {bottomArticles.map((article) => {
        const author = getAuthorById(article.authorId); // ✅ FIXED: Ambil berdasarkan `authorId`
        return (
          <div key={article.id} className="flex items-start gap-4">
            {/* Gambar kecil */}
            <div className="relative w-[130px] h-[90px] flex-shrink-0">
              <Image src={article.image} alt={article.title} fill sizes="100vw" className="rounded-lg object-cover" />
            </div>

            {/* Detail Berita */}
            <div className="flex flex-col justify-between h-full">
              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h2 className="text-md font-semibold hover:underline cursor-pointer mt-1">
                  {sliceTitle(article.title, 6)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm  text-gray-300 mt-1 w-full">
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

                <span className="2xl:text-md xl:text-md lg:text-xs text-nowrap">
                  {new Date(article.date).toLocaleDateString()}
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
