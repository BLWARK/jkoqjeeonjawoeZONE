"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import sportNews from "@/data/sportNews";
import LatestNews from "@/components/latestNewsCat/LatestNews";
import users from "@/data/users"; // Data author
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

// 🔹 Fungsi untuk memotong deskripsi (maks 120 karakter)
const sliceDescription = (desc, maxChars = 120) => {
  return desc.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;
};

const SportPage = () => {
  // 🔹 Ambil berita utama (1 berita pertama) & 3 berita di bawahnya
  const mainArticle = sportNews[0];
  const secondaryArticles = sportNews.slice(1, 4);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {/* 🔹 Berita Utama */}
      {mainArticle && (
        <div className="relative w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden">
          <Image
            src={mainArticle.image}
            alt={mainArticle.title}
            fill
            className="object-cover"
            priority={true}
          />
          {/* Overlay */}
          <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`} passHref>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
          </Link>

          {/* Konten Berita */}
          <div className="absolute bottom-5 left-5 text-white">
            <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`} passHref>
              <h1 className="text-3xl font-bold hover:underline cursor-pointer">
                {mainArticle.title}
              </h1>
            </Link>

            {/* 🔹 Deskripsi */}
            <p className="mt-2 text-sm md:text-md text-gray-200">
              {sliceDescription(mainArticle.description)}
            </p>

            {/* Author & Date */}
            <div className="flex items-center text-sm mt-3">
              {mainArticle.authorId && (
                <Image
                  src={getAuthorById(mainArticle.authorId)?.photo || "/default-avatar.jpg"}
                  alt={getAuthorById(mainArticle.authorId)?.name}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              )}
              <span className="ml-2">
                {getAuthorById(mainArticle.authorId)?.name || "Unknown"}
              </span>
              <div className="w-[1px] h-5 bg-white mx-2"></div>
              <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Tiga Berita di Bawahnya */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
        {secondaryArticles.map((article) => (
          <div key={article.id} className="relative w-full h-[250px] rounded-lg overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
            />
            {/* Overlay */}
            <Link href={`/artikel/${article.id}/${article.slug}`} passHref>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
            </Link>

            {/* Konten Berita */}
            <div className="absolute bottom-5 left-5 text-white">
              <Link href={`/artikel/${article.id}/${article.slug}`} passHref>
                <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                  {article.title}
                </h2>
              </Link>

              {/* Author & Date */}
              <div className="flex items-center text-sm mt-2">
                {article.authorId && (
                  <Image
                    src={getAuthorById(article.authorId)?.photo || "/default-avatar.jpg"}
                    alt={getAuthorById(article.authorId)?.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                )}
                <span className="ml-2">
                  {getAuthorById(article.authorId)?.name || "Unknown"}
                </span>
                <div className="w-[1px] h-5 bg-white mx-2"></div>
                <span>{new Date(article.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Iklan & Latest News */}
      <div>
        <Ads />
        <LatestNews category="sport" displayedCategoryArticles={[mainArticle, ...secondaryArticles]} />
      </div>
    </div>
  );
};

export default SportPage;
