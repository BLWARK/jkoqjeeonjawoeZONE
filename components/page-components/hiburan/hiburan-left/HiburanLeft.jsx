import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Hanya untuk mendapatkan data author
import { getCategoryColor } from "@/data/categoryColors"; // Warna kategori

const getAuthorById = (authorId) =>
  users.find((user) => user.id === authorId) || {};

const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords
    ? words.slice(0, maxWords).join(" ") + "..."
    : title;
};

const HiburanLeft = ({ articles = [] }) => {
  // ✅ Menerima data dari props
  return (
    <div className="col-span-1 flex flex-col gap-6 order-2 2xl:order-1 ">
      {articles.map((article) => {
        const author = getAuthorById(article.authorIds);
        return (
          <div key={article.id} className="flex flex-col">
            <div className="relative w-full 2xl:h-[180px] h-[250px]">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
            <div className="mt-2">
              <span
                className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                  article.category[0]
                )}`}
              >
                {article.category[0]}
              </span>
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h4 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                  {sliceTitle(article.title)}
                </h4>
              </Link>
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <Image
                  src={author?.photo || "/default-avatar.png"}
                  alt={author?.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="ml-2">{author?.name || "Unknown"}</span>
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{article.date || "No Date"}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HiburanLeft;
