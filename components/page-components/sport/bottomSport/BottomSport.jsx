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

const BottomSport = ({ bottomArticles }) => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      {bottomArticles.map((article) => {
        const author = getAuthorById(article.authorIds[0]);
        return (
          <div key={article.id} className="flex items-start gap-4">
            {/* Gambar kecil */}
            <div className="relative w-[120px] h-[90px] flex-shrink-0">
              <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
            </div>

            {/* Detail Berita */}
            <div className="flex-1">
              {/* Judul */}
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h4 className="text-md font-semibold hover:underline cursor-pointer">{sliceTitle(article.title, 8)}</h4>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-1">
                {author?.photo && (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                )}
                <span className="ml-2">{author?.name || "Unknown Author"}</span>
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

export default BottomSport;
