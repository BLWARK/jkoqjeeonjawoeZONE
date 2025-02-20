import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getCategoryColor } from "@/data/categoryColors";
import users from "@/data/users"; // Import data author

const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const sliceTitle = (title, maxWords = 6) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const SidePopular = ({ sideArticles }) => {
  return (
    <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col gap-6">
      {sideArticles.map((article) => {
        const author = getAuthorById(article.authorIds[0]);
        return (
          <div key={article.id} className="flex flex-col items-start gap-4">
            <div className="relative 2xl:w-[280px] w-full 2xl:h-[300px] h-[250px] flex-shrink-0">
              <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
            </div>
            <div className="flex-1 ">
              <span className={`px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(article.category[0])}`}>
                {article.category[0]}
              </span>
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h3 className="text-white text-md font-bold leading-tight hover:underline cursor-pointer mt-3">
                  {sliceTitle(article.title, 6)}
                </h3>
              </Link>
              <div className="mt-4 flex items-center text-sm text-gray-300">
                {author?.photo && <Image src={author.photo} alt={author.name} width={20} height={20} className="rounded-full" />}
                <span className="ml-2">{author?.name || "Unknown Author"} • {article.date}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SidePopular;
