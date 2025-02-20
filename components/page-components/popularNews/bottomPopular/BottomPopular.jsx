import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Import data author

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomPopular = ({ bottomArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {bottomArticles.map((article) => {
        const author = getAuthorById(article.authorId); // FIX: Menggunakan authorId langsung tanpa array

        return (
          <div key={article.id} className="flex items-center gap-4">
            {/* Gambar */}
            <div className="relative w-[130px] h-[100px]">
              <Image src={article.image} alt={article.title} fill sizes="100vw" className="rounded-lg object-cover" />
            </div>

            {/* Konten */}
            <div className="flex-1">
              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h2 className="text-lg font-semibold hover:underline cursor-pointer text-white">
                  {sliceTitle(article.title, 8)}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-xs text-white mt-1">
                {author?.photo ? (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={18}
                    height={18}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{author?.name || "Unknown Author"}</span>

                {/* Garis Pemisah */}
                <div className="w-[1px] h-4 bg-gray-300 mx-2"></div>

                {/* Tanggal */}
                <span>{article.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomPopular;
