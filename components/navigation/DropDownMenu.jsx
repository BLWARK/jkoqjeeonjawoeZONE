"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useBackContext } from "@/context/BackContext";

const DropdownMenu = ({ category, isVisible, onMouseEnter, onMouseLeave }) => {
  const { getArticlesByCategory, articlesByCategory, platformSlugToId } = useBackContext();
  const [animationClass, setAnimationClass] = useState("");
  const pathname = usePathname();

const slug = pathname?.startsWith("/regional/") ? pathname.split("/")[2] : null;
const platformId = platformSlugToId?.[slug] || 1; // fallback ke nasional

  // 🔹 Mapping kategori frontend ke nama kategori backend
  // const categoryMap = {
  //   entertainment: "ENTERTAINTMENT",
  //   technology: "TECHNOLOGY",
  //   sport: "SPORT",
  //   lifestyle: "LIFESTYLE",
  //   "c-level": "C-LEVEL",
  //   berita: "Berita", // kalau perlu
  // };

  // Pakai langsung slug dari URL


  const formattedCategory = category[category?.toLowerCase()];
if (!formattedCategory) return null; // jangan fetch kalau tidak valid



  // 🔹 Ambil artikel dari backend saat kategori berubah
  useEffect(() => {
  if (formattedCategory && platformId) {
    getArticlesByCategory(formattedCategory, platformId, 1, 4);
  }
}, [formattedCategory, platformId]);

  // 🔹 Animasi masuk/keluar
  useEffect(() => {
    setAnimationClass(isVisible ? "dropdown-enter" : "dropdown-exit");
  }, [isVisible]);

  const articles = articlesByCategory[formattedCategory] || [];

  return (
    <div
      className={`hidden absolute top-[355px] transform -translate-x-1/2 bg-white shadow-lg rounded-lg 2xl:w-[1200px] xl:w-[1200px] lg:w-[1000px] p-10 z-50 2xl:flex xl:flex lg:flex justify-center space-x-6 border border-gray-200 ${animationClass}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {articles.map((article) => (
        <div key={article.article_id} className="flex flex-col items-start w-64">
          <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
            <div className="relative w-[220px] h-[150px]">
              <Image
                src={article.image || "/default.jpg"}
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
      ))}
    </div>
  );
};

export default DropdownMenu;
