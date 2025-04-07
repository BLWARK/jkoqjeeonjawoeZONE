"use client";

import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import MostReadTag from "@/components/mostRead/MostReadTag";

const ARTICLES_PER_PAGE = 6;

const TagPage = () => {
  const params = useParams();
  const { tag } = params;
  const { getArticlesByTag, articlesByTag, articlesByTagMeta } = useBackContext();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (tag) {
      getArticlesByTag(tag, 1, ARTICLES_PER_PAGE);
    }
  }, [tag]);

  useEffect(() => {
    getArticlesByTag(tag, currentPage, ARTICLES_PER_PAGE);
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < articlesByTagMeta?.total_pages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="px-3 py-10 w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto 2xl:py-8">
      <h2 className="text-3xl font-bold text-pink-500 mb-5">
        Tag: {tag.replace("-", " ")}
      </h2>
      <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-1">
          {articlesByTag.slice(0, 4).map((article) => (
            <div key={article.article_id} className="flex flex-col lg:flex-row gap-6 border-b pb-4 border-b-gray-200 mt-4">
              <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                <div className="relative w-full lg:w-[300px] h-[150px]">
                  <Image src={article.image} alt={article.title} fill style={{ objectFit: "cover" }} className="rounded-lg" />
                </div>
              </Link>
              <div className="flex-1 flex-col justify-between">
                <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                  <h2 className="text-lg font-bold hover:underline cursor-pointer">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  {article.author?.avatar && (
                    <Image src={article.author.avatar} alt={article.author.username} width={24} height={24} className="rounded-full" />
                  )}
                  <span className="ml-2">{article.author?.username || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-1 gap-4 mt-4">
            {articlesByTag.slice(4).map((article) => (
              <div key={article.article_id} className="border-b pb-2 flex items-center gap-4">
                <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                  <div className="relative w-[120px] h-[80px] flex-shrink-0">
                    <Image src={article.image} alt={article.title} fill style={{ objectFit: "cover" }} className="rounded-lg" />
                  </div>
                </Link>
                <div className="flex-1">
                  <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                    <h2 className="text-md font-semibold hover:underline cursor-pointer">
                      {article.title}
                    </h2>
                  </Link>
                  <span className="text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {articlesByTagMeta?.total_pages > 1 && (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {articlesByTagMeta.total_pages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === articlesByTagMeta.total_pages}
                className={`px-4 py-2 text-white rounded-lg ${currentPage === articlesByTagMeta.total_pages ? "bg-gray-400 cursor-not-allowed" : "bg-pink-500 hover:bg-pink-600"}`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-l-0 border-l-gray-300 2xl:pl-5 xl:pl-5 lg:pl-5 pl-0">
          <MostReadTag />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
