"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";

const RelatedNews = ({ currentArticle }) => {
  const { getArticlesByCategory, articlesByCategory } = useBackContext();
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState(8);

  useEffect(() => {
    if (currentArticle?.category?.[0]) {
      getArticlesByCategory(currentArticle.category);
    }
  }, [currentArticle]);

  useEffect(() => {
    const all = articlesByCategory[currentArticle?.category?.[0]] || [];
    const filtered = all.filter(
      (a) => a.article_id !== currentArticle.article_id
    );
    setRelatedArticles(filtered);
  }, [articlesByCategory, currentArticle]);

  const handleLoadMore = () => {
    setVisibleArticles((prev) => prev + 4);
  };

  if (relatedArticles.length === 0) return null;

  return (
    <div className="my-10">
      <h2 className="text-2xl font-bold text-pink-500">Berita Terkait</h2>
      <div className="w-[10%] h-[5px] bg-pink-500 mb-5 rounded-full my-5"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedArticles.slice(0, visibleArticles).map((article) => (
          <div key={`${article.article_id}-related`} className="flex flex-col">
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <div className="relative w-full h-[200px]">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
            </Link>

            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <h4 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                {article.title}
              </h4>
            </Link>

            <div className="flex items-center text-sm text-gray-500 mt-2">
              {article.author?.avatar ? (
                <Image
                  // src={article.author.avatar || "/default.jpg"} 
                  src={"/default.jpg"}
                  alt={article.author.fullname}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
              )}
              <span className="ml-2">{article.author?.fullname || "Unknown"}</span>
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              <span>{new Date(article.date).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-start mt-6">
  {visibleArticles < relatedArticles.length ? (
    <button
      onClick={handleLoadMore}
      className="px-6 py-3 text-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition rounded-lg"
    >
      Load More
    </button>
  ) : (
    <a
      href={`/${currentArticle?.category?.[0].toLowerCase()}`}
      className="px-6 py-3 text-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 transition rounded-lg"
    >
      View All
    </a>
  )}
</div>

    </div>
  );
};

export default RelatedNews;
