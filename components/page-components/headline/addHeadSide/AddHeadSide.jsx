"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";

// ✅ Komponen menerima `headlines` dari parent
const AddHeadSide = ({ headlines }) => {
  if (!headlines || headlines.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Tidak ada headline samping yang tersedia.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 2xl:gap-4 gap-4">
      {headlines.map((article) => (
        <div
          key={article?.article_id}
          className="2xl:w-[390px] 2xl:h-[242px] w-full h-[200px] relative"
        >
          {/* 🔹 Gambar Artikel */}
          <Image
            src={article?.image || "/default.jpg"}
            alt={article?.title || "No Title"}
            className="rounded-lg"
            fill
            style={{ objectFit: "cover" }}
          />

          {/* 🔹 Overlay */}
          <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-4 flex flex-col justify-end">
              {/* 🔹 Kategori */}
              {article?.category?.length > 0 && (
                <span
                  className={`absolute top-3 left-3 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
                    article.category[0]
                  )}`}
                >
                  {article.category[0]}
                </span>
              )}

              {/* 🔹 Judul */}
              <h3 className="text-white text-md font-bold leading-tight mt-1 hover:underline cursor-pointer">
                {article?.title || "No Title"}
              </h3>

              {/* 🔹 Author & Date */}
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-300">
                {article?.author?.avatar ? (
                  <Image
                    src={article.author.avatar}
                    alt={article.author.fullname || "Unknown"}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                )}
                <span>{article.author?.fullname || "Unknown"}</span>

                {/* 🔹 Garis Pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2" />

                {/* 🔹 Tanggal */}
                <span>
                  {article.date
                    ? new Date(article.date).toLocaleDateString("id-ID")
                    : "-"}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AddHeadSide;
