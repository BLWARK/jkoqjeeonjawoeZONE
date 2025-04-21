"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import LatestNews from "@/components/latestNewsCat/LatestNews";
import Ads from "@/components/page-components/adv-sect/AdvBottomHead";

const sliceDescription = (desc, maxChars = 120) => {
  return desc?.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;
};

const TechnologyPage = () => {
  const { getHeadlines, headlines } = useBackContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await getHeadlines(1, "TECHNOLOGY");
      setIsLoading(false);
    };
    fetchData();
  }, [getHeadlines]);

  const mainArticle = headlines.find((item) => item.position === 1)?.article;
  const rightSideArticles = headlines
    .filter((item) => [2, 3, 4].includes(item.position))
    .sort((a, b) => a.position - b.position)
    .map((item) => item.article);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-5 2xl:px-0 px-4">
      {isLoading ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 🔹 Main Headline */}
            {mainArticle && (
              <div className="relative w-full h-[400px] md:h-[520px] rounded-lg overflow-hidden">
                <Image
                  src={mainArticle.image}
                  alt={mainArticle.title}
                  fill
                  className="object-cover"
                  priority={true}
                />
                <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                </Link>
                <div className="absolute bottom-5 left-5 text-white">
                  <Link href={`/artikel/${mainArticle.article_id}/${mainArticle.slug}`} passHref>
                    <h1 className="text-3xl font-bold hover:underline cursor-pointer">
                      {mainArticle.title}
                    </h1>
                  </Link>
                  <p className="mt-2 text-sm md:text-md text-gray-200">
                    {sliceDescription(mainArticle.description || "")}
                  </p>
                  <div className="flex items-center text-sm mt-3">
                    <Image
                      src={mainArticle.author?.avatar || "/default-avatar.jpg"}
                      alt={mainArticle.author?.username || "Unknown"}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="ml-2">{mainArticle.author?.username || "Unknown"}</span>
                    <div className="w-[1px] h-5 bg-white mx-2" />
                    <span>{new Date(mainArticle.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 🔹 Right Side Articles */}
            <div className="grid grid-cols-1 gap-5">
              {/* Berita Panjang di Atas */}
              {rightSideArticles[0] && (
                <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                  <Image
                    src={rightSideArticles[0].image}
                    alt={rightSideArticles[0].title}
                    fill
                    className="object-cover"
                  />
                  <Link href={`/artikel/${rightSideArticles[0].article_id}/${rightSideArticles[0].slug}`} passHref>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </Link>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h2 className="text-xl font-bold hover:underline cursor-pointer">
                      {rightSideArticles[0].title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Dua Berita Kotak */}
              <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4">
                {rightSideArticles.slice(1).map((article) => (
                  <div key={article.article_id} className="relative w-full h-[250px] rounded-lg overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                    <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                    </Link>
                    <div className="absolute bottom-3 left-3 text-white">
                      <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                        <h3 className="text-md font-semibold hover:underline cursor-pointer">
                          {article.title}
                        </h3>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 🔹 Ads & Latest News */}
          <Ads />
          <LatestNews category="teknologi" displayedCategoryArticles={[mainArticle, ...rightSideArticles]} />
        </>
      )}
    </div>
  );
};

export default TechnologyPage;
