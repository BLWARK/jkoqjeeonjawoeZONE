"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users";
import headlines from "@/data/headline";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";

// 🔹 Gabungkan semua artikel dari berbagai kategori
const allArticles = [
  ...headlines,
  ...News,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Komponen Related News dengan Load More
const RelatedNews = ({ currentArticle, mostReadArticles = [] }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(4); // Jumlah berita yang ditampilkan pertama kali

  useEffect(() => {
    if (!currentArticle || !currentArticle.category || currentArticle.category.length === 0) return;

    // 🔹 Ambil ID dari Most Read untuk dikecualikan
    const mostReadIds = new Set(mostReadArticles.map((article) => article.id));

    const filteredArticles = allArticles
      .filter(
        (item) =>
          item.id !== currentArticle.id && // Jangan tampilkan artikel yang sedang dibuka
          item.category.some((cat) => currentArticle.category.includes(cat)) && // Cocokkan kategori
          !mostReadIds.has(item.id) // Hindari artikel yang sudah masuk Most Read
      );

    setRelatedArticles(filteredArticles);
  }, [currentArticle, mostReadArticles]);

  if (relatedArticles.length === 0) return null; // Jika tidak ada berita terkait, jangan tampilkan apapun

  // 🔹 Fungsi untuk menampilkan lebih banyak berita
  const handleLoadMore = () => {
    setVisibleArticles((prev) => prev + 4); // Tambahkan 4 berita setiap kali tombol diklik
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-pink-500">Berita Terkait</h2>
      <div className="w-[10%] h-[5px] bg-pink-500 mb-5 rounded-full my-5"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedArticles.slice(0, visibleArticles).map((news) => {
          const author = getAuthorById(news.authorId);

          return (
            <div key={`${news.id}-related`} className="flex flex-col">
              {/* Gambar */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  loading="lazy"
                  className="rounded-lg object-cover"
                  
                />
              </div>

              {/* Judul */}
              <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
                <h4 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                  {news.title}
                </h4>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm text-gray-500 mt-2">
                {author?.photo && (
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <span className="ml-2">
                  {author?.name || "Unknown Author"}
                </span>

                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🔹 Tombol Load More */}
      {visibleArticles < relatedArticles.length && (
        <div className="flex justify-start mt-6">
          <button
            onClick={handleLoadMore}
            aria-label="Load More button"
            className="px-6 py-3 text-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default RelatedNews;
