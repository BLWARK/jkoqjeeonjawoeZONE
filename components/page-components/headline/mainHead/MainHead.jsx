import React from "react";
import Image from "next/image";
import Link from "next/link";
import headline from "@/data/headline"; // Pastikan path sesuai
import users from "@/data/users"; // Pastikan path sesuai
import { getCategoryColor } from "@/data/categoryColors";

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId);

const MainHead = () => {
  const mainHeadline = headline[0]; // Berita utama
  const author = getAuthorById(mainHeadline.authorId); // Ambil author langsung

  return (
    <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-0 2xl:w-full 2xl:h-[500px] xl:h-full lg:h-full w-full h-[300px] relative ">
      {/* Gambar Headline */}
      <Image
        src={mainHeadline.image}
        alt={mainHeadline.title}
        className="rounded-lg"
        fill
        sizes="100vw"
        style={{ objectFit: "cover" }}
        priority
        
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-6 flex flex-col justify-end">
        {/* Judul */}
        <Link href={`/artikel/${mainHeadline.id}/${mainHeadline.slug}`} passHref>
          <h2 className="text-white 2xl:text-3xl text-lg font-bold leading-tight mt-2 hover:underline cursor-pointer">
            {mainHeadline.title}
          </h2>
        </Link>

        {/* Deskripsi */}
        <p className="text-gray-300 mt-4 2xl:block hidden">{mainHeadline.description}</p>

        {/* Author & Tanggal */}
        <div className="mt-4 flex items-center space-x-2 text-sm text-gray-300">
          {author && (
            <div className="flex 2xl:text-xs text-[0.9em] items-center space-x-2">
              <Image
                src={author.photo}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="border-r border-gray-300 pr-2">{author.name}</span>
            </div>
          )}
          <span>{mainHeadline.date}</span>
        </div>
      </div>

      {/* Kategori */}
      <span
        className={`absolute top-4 left-4 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
          mainHeadline.category[0]
        )}`}
      >
        {mainHeadline.category[0]}
      </span>
    </div>
  );
};

export default MainHead;
