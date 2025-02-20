import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; // Import data author

const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const MainPopular = ({ mainArticle }) => {
  if (!mainArticle) return null;

  const author = getAuthorById(mainArticle.authorIds[0]);

  return (
    <div className="w-full relative">
      <div className="relative w-full h-[350px] md:h-[450px]">
        <Image src={mainArticle.image} alt={mainArticle.title} fill className="rounded-lg object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg p-6 flex flex-col justify-end">
          <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(mainArticle.category[0])}`}>
            {mainArticle.category[0]}
          </span>
          <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`}>
            <h2 className="text-white text-2xl font-bold leading-tight hover:underline cursor-pointer">
              {sliceTitle(mainArticle.title)}
            </h2>
          </Link>
          <div className="mt-2 flex items-center text-sm text-gray-300">
            {author?.photo && <Image src={author.photo} alt={author.name} width={24} height={24} className="rounded-full" />}
            <span className="ml-2">{author?.name || "Unknown Author"} • {mainArticle.date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPopular;
