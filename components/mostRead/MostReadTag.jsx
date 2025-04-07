"use client";

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
import cLevel from "@/data/cLevel";
import AdsMostRead from "@/components/page-components/adv-sect/AdvMostRead"
import AdsMostRead2 from "@/components/page-components/adv-sect/AdvMostRead2"

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Gabungkan semua artikel dari berbagai kategori
const allArticles = [
  ...headlines,
  ...News,
  ...cLevel,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

// 🔹 Urutkan berdasarkan views tertinggi
const sortedArticles = allArticles
  .filter((article) => article.views !== undefined)
  .sort((a, b) => b.views - a.views);

// 🔹 Ambil 5 berita paling populer untuk Most Read
const mostReadArticles = sortedArticles.slice(0, 5);

const MostReadTag = () => {
  return (
    <div className=" w-full flex flex-col gap-6">
      
      <AdsMostRead/>
      <AdsMostRead2/>

      <h2 className="text-2xl font-bold text-pink-500">Most Read</h2>
      <div className="w-[50%] h-[5px] bg-pink-500 mb-5 rounded-full"></div>
      <div className="flex flex-col gap-4">
        {mostReadArticles.map((news) => {
          const author = getAuthorById(news.authorId);

          return (
            <div key={`${news.id}-most-read`} className="flex flex-col  border-b border-gray-300 py-3 ">
              {/* Gambar */}
              <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
              <div className="relative w-full 2xl:h-[200px] h-[250px]">
                <Image
                  src={news.image}
                  alt={news.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              </Link>

              {/* Judul */}
              <div className="mt-2">
                <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
                  <h4 className="text-md font-semibold hover:underline cursor-pointer">
                    {news.title}
                  </h4>
                </Link>
              </div>

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

                {/* Garis Pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                {/* Tanggal */}
                <span>{new Date(news.date).toLocaleDateString()}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MostReadTag;
