import React from "react";
import Image from "next/image";
import Link from "next/link";
import users from "@/data/users"; // Import data author

const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

const sliceTitle = (title, maxWords = 8) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const BottomPopular = ({ bottomArticles }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {bottomArticles.map((article) => {
        const author = getAuthorById(article.authorIds[0]);
        return (
          <div key={article.id} className="flex items-center gap-4">
            <div className="relative w-[130px] h-[100px]">
              <Image src={article.image} alt={article.title} fill className="rounded-lg object-cover" />
            </div>
            <div className="flex-1">
              <Link href={`/artikel/${article.id}/${article.slug}`}>
                <h4 className="text-lg font-semibold hover:underline cursor-pointer text-white">
                  {sliceTitle(article.title, 8)}
                </h4>
              </Link>
              <p className="text-xs text-white mt-1">{article.date}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BottomPopular;
