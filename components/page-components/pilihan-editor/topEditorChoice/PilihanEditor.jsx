"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext"; // ✅ Ambil dari context
import AddEditorBottom from "@/components/page-components/pilihan-editor/addBottomEditor/AddBottomEditor";
import SocialMedia from "@/components/page-components/socialMedia/SocialMedia";
import Adv from "@/components/page-components/adv-sect/AdvEditor";
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Fungsi untuk memotong judul (max 10 kata)
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const PilihanEditorComponent = () => {
  const { editorChoices, getEditorChoices } = useBackContext();
  const [mainArticle, setMainArticle] = useState(null);

  // ✅ Ambil data pilihan editor dari backend
  useEffect(() => {
    if (editorChoices.length === 0) {
      getEditorChoices(1); // platformId = 1
    }
  }, [editorChoices, getEditorChoices]);

  // ✅ Filter artikel dengan posisi = 1
  useEffect(() => {
    if (editorChoices.length > 0) {
      const topChoice = editorChoices.find((item) => item.position === 1)?.article || null;
      setMainArticle(topChoice);
    }
  }, [editorChoices]);

  if (!mainArticle) {
    return <p className="text-center text-gray-500 py-10"></p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-20 py-8">
      <h2 className="text-3xl font-bold text-pink-500 flex items-center mb-3">
        Pilihan Editor
      </h2>
      <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Main Article */}
        <div className="lg:col-span-2">
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
            {/* Artikel Utama - Teks */}
            <div className="lg:w-[50%] w-full flex flex-col">
              {/* Kategori */}
              {mainArticle.category && (
                <span
                  className={`px-3 py-1 text-xs font-semibold text-white rounded max-w-max ${
                    mainArticle.category[0]
                      ? getCategoryColor(mainArticle.category[0])
                      : "bg-gray-500"
                  }`}
                >
                  {mainArticle.category[0] || "General"}
                </span>
              )}

              {/* Judul */}
              <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                <h2 className="text-3xl font-bold hover:underline cursor-pointer mt-2">
                  {sliceTitle(mainArticle.title)}
                </h2>
              </Link>

              {/* Deskripsi */}
              <p className="text-gray-500 mt-2 text-sm">
                {mainArticle.description}
              </p>

              {/* 🔹 Author & Date */}
              <div className="flex items-center mt-4 text-sm text-gray-500">
                {/* Author Info */}
                {mainArticle.author?.avatar ? (
                  <Image
                    src={mainArticle.author.avatar || "/default.jpg"}
                    alt={mainArticle.author.fullname}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[24px] h-[24px] bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">
                  {mainArticle.author?.fullname || "Unknown Author"}
                </span>

                {/* Garis pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>
                  {new Date(mainArticle.date).toLocaleDateString("id-ID")}
                </span>
              </div>
            </div>

            {/* Artikel Utama - Gambar */}
            <div className="relative w-full lg:w-[50%] h-[250px] lg:h-[300px]">
              <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                <Image
                  src={mainArticle.image || "/default.jpg"}
                  alt={mainArticle.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </Link>
            </div>
          </div>

          {/* Additional Articles Below */}
          <AddEditorBottom />
        </div>

        {/* Right Section - Ads & Social Media */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Ads Section */}
          <Adv />

          {/* Social Media Followers */}
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default PilihanEditorComponent;
