import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; 
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// 🔹 Gabungkan semua artikel
const allArticles = [
  ...headlines,
  ...News,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Urutkan berita berdasarkan `views` dari terbesar ke terkecil
const sortedArticles = allArticles
  .filter((article) => article.views !== undefined) // Pastikan hanya yang memiliki views
  .sort((a, b) => b.views - a.views);

// 🔹 Ambil berita **views tertinggi ke-4, ke-5, dan ke-6**
const bottomArticles = sortedArticles.slice(3, 6); 

// 🔹 Fungsi untuk memotong judul menjadi maksimal 8 kata
const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

// ✅ **Komponen BottomPopular untuk berita ranking 4-6 berdasarkan views**
const BottomPopular = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {bottomArticles.map((article) => {
        const author = getAuthorById(article.authorId); 

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
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomPopular;
