import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Import users data
import { getCategoryColor } from "@/data/categoryColors"; // Import kategori warna

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const AddHeadBottom = ({ headlines }) => {
  if (headlines.length === 0) {
    return <p className="text-center text-gray-500 py-10">Belum ada berita headline tambahan.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      {headlines.slice(0, 2).map((headline) => {
        const author = getAuthorById(headline.authorId);

        return (
          <div key={headline.id} className="flex items-center bg-white shadow-sm rounded-lg overflow-hidden">
            {/* 🔹 Gambar Artikel */}
            <div className="relative w-[200px] h-[130px] flex-shrink-0">
              <Image src={headline.image} alt={headline.title} fill loading="lazy" className="object-cover rounded-lg" />
            </div>

            {/* 🔹 Konten Artikel */}
            <div className="p-4 flex-1">
              {/* 🔹 Kategori */}
              <span
                className={`inline-block mb-2 px-3 py-1 text-xs font-semibold text-white rounded-lg ${getCategoryColor(
                  headline.category[0]
                )}`}
              >
                {headline.category[0]}
              </span>

              {/* 🔹 Judul Artikel */}
              <Link href={`/artikel/${headline.id}/${headline.slug}`} passHref>
                <h3 className="text-black text-md font-semibold hover:underline cursor-pointer">
                  {headline.title}
                </h3>
              </Link>

              {/* 🔹 Author & Date */}
              <div className="mt-2 flex items-center text-sm text-gray-500">
                {author?.photo ? (
                  <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />
                ) : (
                  <div className="w-[20px] h-[20px] bg-gray-400 rounded-full"></div>
                )}
                <span className="ml-2">{author.name || "Unknown"}</span>

                {/* 🔹 Garis pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                {/* 🔹 Tanggal */}
                <span>{new Date(headline.date).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AddHeadBottom;
