import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Data author
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const AddHeadSide = ({ headlines }) => {
  return (
    <div className="grid grid-cols-1 2xl:gap-6 gap-4">
      {headlines.map((headline) => {
        const author = getAuthorById(headline.authorId);

        return (
          <div key={headline.id} className="2xl:w-[390px] 2xl:h-[238px] w-full h-[200px] relative">
            {/* Gambar Artikel */}
            <Image src={headline.image} alt={headline.title} className="rounded-lg" fill style={{ objectFit: "cover" }} />

            {/* Overlay Konten */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-4 flex flex-col justify-end">
              {/* 🔹 Kategori */}
              <span
                className={`absolute top-3 left-3 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
                  headline.category[0]
                )}`}
              >
                {headline.category[0]}
              </span>

              <Link href={`/artikel/${headline.id}/${headline.slug}`} passHref>
                <h3 className="text-white text-md font-bold leading-tight mt-1 hover:underline cursor-pointer">
                  {headline.title}
                </h3>
              </Link>

              {/* 🔹 Author & Date */}
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-300">
                {author?.photo && (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                )}
                <span>{author.name || "Unknown"}</span>
                
                {/* 🔹 Garis Vertikal Pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                <span>{new Date(headline.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddHeadSide;
