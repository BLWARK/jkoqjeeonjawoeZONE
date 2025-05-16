"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";

// ✅ Komponen menerima `headlines` dari parent
const AddHeadBottom = ({ headlines }) => {
  if (!headlines || headlines.length === 0) {
    return (
      <p className="text-center text-gray-500 py-10">
        Belum ada berita headline tambahan.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {headlines.map((article) => {
        const author = article?.author || {};

        return (
          <div
            key={article.article_id}
            className="flex items-center bg-white shadow-sm p-4 rounded-lg overflow-hidden"
          >
            {/* 🔹 Gambar Artikel */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
              <div className="relative w-[180px] h-[130px] flex-shrink-0">
                <Image
                  src={article.image || "/default.jpg"}
                  alt={article.title}
                  fill
                  loading="lazy"
                  className="object-cover rounded-lg"
                />
              </div>
            </Link>

            {/* 🔹 Konten Artikel */}
            <div className="p-4 flex-1">
              {/* 🔹 Kategori */}
              {article.category?.length > 0 && (
                <span
                  className={`inline-block mb-2 px-3 py-1 text-xs font-semibold text-white rounded-lg ${getCategoryColor(
                    article.category[0]
                  )}`}
                >
                  {article.category[0]}
                </span>
              )}

              {/* 🔹 Judul Artikel */}
              <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                <h3 className="text-black text-md font-semibold hover:underline cursor-pointer">
                  {article.title}
                </h3>
              </Link>

              {/* 🔹 Author & Date */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {author?.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.fullname}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[20px] h-[20px] bg-gray-400 rounded-full"></div>
                )}

                <span className="ml-2">{author.fullname || "Unknown"}</span>

                {/* 🔹 Garis pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                <span>
                  {article.date
                    ? new Date(article.date).toLocaleDateString("id-ID")
                    : "-"}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddHeadBottom;
