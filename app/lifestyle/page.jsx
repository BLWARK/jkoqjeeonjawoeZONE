"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import lifestyleNews from "@/data/lifestyleNews"; // Import data berita Lifestyle
import users from "@/data/users"; // Import data author
import Ads from '@/components/page-components/adv-sect/AdvBottomHead'
import LatestNews from "@/components/latestNewsCat/LatestNews";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Sorting berdasarkan tanggal terbaru
const sortedNews = [...lifestyleNews].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

const LifestylePage = () => {
  if (sortedNews.length === 0) {
    return <p className="text-center py-10">Belum ada berita Lifestyle.</p>;
  }

  // 🔹 Ambil berita untuk setiap bagian
  const mainArticle = sortedNews[0]; // Berita utama (Paling baru)
  const bottomArticles = sortedNews.slice(3, 7); // 2 Berita di kiri
  const rightArticles = sortedNews.slice(1, 3); // 2 Berita di kanan

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {/* 🔥 Grid Layout 3 Kolom */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🔵 TENGAH: Berita Utama */}
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden border col-span-2">
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            className="object-cover"
          />
          <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`}>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-5 flex flex-col justify-end">
            
              <h2 className="text-2xl font-bold text-white hover:underline cursor-pointer">
                {mainArticle.title}
              </h2>
            
            <div className="flex items-center text-sm text-white mt-2">
              {getAuthorById(mainArticle.authorId).photo && (
                <Image
                  src={getAuthorById(mainArticle.authorId).photo}
                  alt={getAuthorById(mainArticle.authorId).name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="ml-2">
                {getAuthorById(mainArticle.authorId).name || "Unknown"}
              </span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
            </div>
          </div>
          </Link>
        </div>

        {/* 🟠 KANAN: 2 Berita */}
        <div className="flex flex-co  gap-4 col-span-1">
          {rightArticles.map((article) => {
            const author = getAuthorById(article.authorId);
            return (
              <div key={article.id} className="flex flex-col gap-2 ">
                <Link href={`/artikel/${article.id}/${article.slug}`}>
                <div className="relative  w-full h-[200px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="rounded-lg object-cover "
                  />
                </div>
                </Link>
                <div className="flex  flex-col">
                <Link href={`/artikel/${article.id}/${article.slug}`}>
                  <h3 className="text-lg font-semibold mt-2 hover:underline cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex flex-col items-start text-sm text-gray-500 mt-2">
                <span>{new Date(article.date).toLocaleDateString()}</span>
                    <div className="flex mt-2 justify-start items-center">
                  {author.photo && (
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="ml-2">{author.name || "Unknown"}</span>
                  </div>
                  
                 
                </div>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
      {/* 🟢 bawah: 4 Berita */}
      <div className="grid  2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 grid-cols-1 gap-6 mt-6 ">
          {bottomArticles.map((article) => {
            const author = getAuthorById(article.authorId);
            return (
              <div key={article.id} className="flex flex-col border-b pb-4">
                <Link href={`/artikel/${article.id}/${article.slug}`}>
                <div className="relative w-full h-[200px]">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
                </Link>
                <Link href={`/artikel/${article.id}/${article.slug}`}>
                  <h3 className="text-lg font-semibold mt-2 hover:underline cursor-pointer">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  {author.photo && (
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span className="ml-2">{author.name || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            );
          })}
        </div>
        <Ads/>
        <LatestNews category="lifestyle" displayedCategoryArticles={[mainArticle, ...bottomArticles, ...rightArticles]} />
    </div>
  );
};

export default LifestylePage;
