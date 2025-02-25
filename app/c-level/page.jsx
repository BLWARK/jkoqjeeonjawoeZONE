"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import cLevelNews from "@/data/cLevel"; // Import data berita C-Level
import users from "@/data/users"; // Import data author
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";
import LatestNews from "@/components/latestNewsCat/LatestNews";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

const CLevelPage = () => {
  // 🔹 Ambil berita utama (1 berita pertama)
  const mainArticle = cLevelNews[0];
  // 🔹 Ambil 3 berita lainnya (1 besar atas, 2 kecil bawah)
  const secondaryArticles = cLevelNews.slice(1, 4);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {/* 🔹 Layout Utama (Kiri & Kanan) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* 🔹 Bagian Kiri - Berita Utama */}
        {mainArticle && (
          <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden">
            <Image
              src={mainArticle.image}
              alt={mainArticle.title}
              fill
              className="object-cover"
              priority={true}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

            {/* Konten Berita */}
            <div className="absolute bottom-5 left-5 text-white">
              <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`} passHref>
                <h1 className="text-3xl font-bold hover:underline cursor-pointer">
                  {mainArticle.title}
                </h1>
              </Link>

              {/* Deskripsi */}
              <p className="mt-2 text-sm">{mainArticle.description}</p>

              {/* Author & Date */}
              <div className="flex items-center text-sm mt-2">
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

        {/* 🔹 Bagian Kanan - 3 Berita Lainnya */}
        <div className="flex flex-col gap-4">
          {/* 🔹 1 Berita Besar di Atas */}
          {secondaryArticles[0] && (
            <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
              <Image
                src={secondaryArticles[0].image}
                alt={secondaryArticles[0].title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

              <div className="absolute bottom-5 left-5 text-white">
                <Link href={`/artikel/${secondaryArticles[0].id}/${secondaryArticles[0].slug}`} passHref>
                  <h2 className="text-lg font-semibold hover:underline cursor-pointer">
                    {secondaryArticles[0].title}
                  </h2>
                </Link>

                {/* Author & Date */}
                <div className="flex items-center text-sm mt-2">
                  {secondaryArticles[0].authorId && (
                    <Image
                      src={getAuthorById(secondaryArticles[0].authorId)?.photo || "/default-avatar.jpg"}
                      alt={getAuthorById(secondaryArticles[0].authorId)?.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                  )}
                  <span className="ml-2">
                    {getAuthorById(secondaryArticles[0].authorId)?.name || "Unknown"}
                  </span>
                  <div className="w-[1px] h-5 bg-white mx-2"></div>
                  <span>{new Date(secondaryArticles[0].date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* 🔹 2 Berita Kotak di Bawahnya */}
          <div className="2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 grid">
            {secondaryArticles.slice(1).map((article) => (
              <div key={article.id} className="relative w-full h-[250px] rounded-lg overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>

                <div className="absolute bottom-3 left-3 text-white">
                  <Link href={`/artikel/${article.id}/${article.slug}`} passHref>
                    <h3 className="text-sm font-semibold hover:underline cursor-pointer">
                      {article.title}
                    </h3>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔹 Iklan */}
      <Ads />

      {/* 🔹 Berita Terbaru */}
      <LatestNews category="c-level" displayedCategoryArticles={[mainArticle, ...secondaryArticles]} />

    </div>
  );
};

export default CLevelPage;
