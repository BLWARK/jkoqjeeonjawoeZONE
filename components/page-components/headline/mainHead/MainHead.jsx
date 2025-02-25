import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Data author
import { getCategoryColor } from "@/data/categoryColors";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const MainHead = ({ headline }) => {
  if (!headline) {
    return <p className="text-center text-gray-500 py-10">Belum ada berita headline terbaru.</p>;
  }

  const author = getAuthorById(headline.authorId);

  return (
    <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-0 2xl:w-full 2xl:h-[500px] xl:h-full lg:h-full w-full h-[300px] relative">
      {/* 🔹 Gambar Headline */}
      <Image
        src={headline.image}
        alt={headline.title}
        className="rounded-lg"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority={true}
      />

      {/* 🔹 Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-6 flex flex-col justify-end">
        <Link href={`/artikel/${headline.id}/${headline.slug}`} passHref>
          <h2 className="text-white 2xl:text-3xl text-lg font-bold leading-tight mt-2 hover:underline cursor-pointer">
            {headline.title}
          </h2>
        </Link>

        {/* 🔹 Deskripsi */}
        <p className="text-gray-300 mt-4 2xl:block hidden">{headline.description}</p>

        {/* 🔹 Author & Tanggal */}
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
          {author?.photo ? (
            <Image src={author.photo} alt={author.name} width={24} height={24} className="rounded-full" />
          ) : (
            <div className="w-[24px] h-[24px] bg-gray-400 rounded-full"></div>
          )}
          <span className="border-r border-gray-300 pr-2">{author.name || "Unknown"}</span>
          <span>{new Date(headline.date).toLocaleDateString()}</span>
        </div>
      </div>

      {/* 🔹 Kategori */}
      <span
        className={`absolute top-4 left-4 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
          headline.category[0]
        )}`}
      >
        {headline.category[0]}
      </span>
    </div>
  );
};

export default MainHead;
