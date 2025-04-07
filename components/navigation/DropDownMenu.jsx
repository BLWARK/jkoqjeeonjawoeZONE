"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import News from "@/data/news";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import cLevel from "@/data/cLevel";
import users from "@/data/users"; // Data author

// 🔹 Map kategori ke dataset berita
const categoryArticles = {
  berita: News,
  entertainment: entertainmentNews,
  technology: teknologiData,
  sport: olahraga,
  "c-level": cLevel,
  lifestyle: lifestyleNews,
};

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

const DropdownMenu = ({ category, isVisible, onMouseEnter, onMouseLeave }) => {
  const [articles, setArticles] = useState([]);
  const [animationClass, setAnimationClass] = useState(""); // 🔥 Animasi class

  useEffect(() => {
    const selectedArticles = categoryArticles[category] || [];
    const sortedArticles = selectedArticles
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 4); // Ambil 4 berita terbaru

    setArticles(sortedArticles);
  }, [category]);

  useEffect(() => {
    if (isVisible) {
      setAnimationClass("dropdown-enter"); // Tambahkan animasi saat muncul
    } else {
      setAnimationClass("dropdown-exit"); // Tambahkan animasi saat menghilang
    }
  }, [isVisible]);

  return (
    <div
      className={`hidden absolute top-[330px]  transform -translate-x-1/2 bg-white shadow-lg rounded-lg 2xl:w-[1200px] xl:w-[1200px] lg:w-[1000px]  p-10 z-50 2xl:flex xl:flex lg:flex justify-center space-x-6 border border-gray-200 ${animationClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
        
      {articles.map((article) => {
        const author = getAuthorById(article.authorId);
        return (
            
          <div key={article.id} className="flex flex-col items-start w-64">
            <Link href={`/artikel/${article.id}/${article.slug}`}>
            <div className="relative w-full h-[130px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="mt-2">
              
                <h4 className="text-sm font-semibold hover:underline cursor-pointer">
                  {article.title}
                </h4>
              
             
            </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownMenu;
