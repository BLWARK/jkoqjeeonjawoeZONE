"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import regionArticles from "@/data/regionArticles";
import regionPlatformMap from "@/data/regionPlatformMap";
import LatestNewsReg from "@/components/latestNewsReg/LatestNewsReg";
import AdvBottomHead from "@/components/page-components/adv-sect/AdvBottomHead";
import { useBackContext } from "@/context/BackContext";
import { getCategoryColor } from "@/data/categoryColors";

const RegionPage = () => {
  const { slug } = useParams();
  const platformId = regionPlatformMap[slug];

  const { getHeadlines, headlines } = useBackContext();

  const [featured, setFeatured] = useState(null);
  const [sideArticles, setSideArticles] = useState([]);
  const [bottomArticles, setBottomArticles] = useState([]);

  const sliceDescription = (desc, maxChars = 120) => {
    return desc.length > maxChars ? desc.slice(0, maxChars) + "..." : desc;
  };

  useEffect(() => {
    if (!platformId) return;

    getHeadlines(platformId, "HOME");
  }, [platformId]);

  useEffect(() => {
    if (!platformId || !headlines[platformId]) return;

    const rawData = headlines[platformId];

    // Pastikan akses ke .article
    const getArticle = (pos) =>
      rawData.find((item) => item.position === pos)?.article;

    const getArticles = (positions) =>
      rawData
        .filter((item) => positions.includes(item.position))
        .map((item) => item.article);

    setFeatured(getArticle(1));
    setSideArticles(getArticles([2, 3]));
    setBottomArticles(getArticles([4, 5]));
  }, [headlines, platformId]);

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-4 space-y-6">
      {/* Top Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Berita Utama */}
        {featured && (
          <div className="relative lg:col-span-2 h-[400px] rounded-lg overflow-hidden group">
            <Image
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
              fill
            />
            <Link href={`/artikel/${featured.article_id}/${featured.slug}`}>
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                {featured.category?.[0] && (
                  <span
                    className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                      featured.category[0]
                    )}`}
                  >
                    {featured.category[0]}
                  </span>
                )}

                <h2 className="text-white 2xl:text-3xl text-lg font-bold leading-tight">
                  {featured.title}
                </h2>
                <p className="text-gray-300 mt-4">
                  {sliceDescription(featured.description || "")}
                </p>
                <div className="flex items-center gap-2 mt-3">...</div>
              </div>
            </Link>
          </div>
        )}

        {/* Samping 2 Berita */}
        <div className="flex flex-col gap-4">
          {sideArticles.map((article) => (
            <Link
              key={article.article_id}
              href={`/artikel/${article.article_id}/${article.slug}`}
            >
              <div className="relative  h-[190px] rounded-lg overflow-hidden group">
                <Image
                  src={article.image}
                  alt={article.title}
                  className=" object-cover "
                  fill
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                  {article.category?.[0] && (
                    <span
                      className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded ${getCategoryColor(
                        article.category[0]
                      )}`}
                    >
                      {article.category[0]}
                    </span>
                  )}

                  <h3 className="text-white text-md font-semibold line-clamp-2">
                    {article.title}
                  </h3>
                  <div className=" flex items-center gap-2 mt-2">
                    <div className=" relative w-[25px] h-[25px]">
                      <Image
                        src={article.author?.avatar || "/default.jpg"}
                        alt={article.author?.fullname}
                        className=" rounded-full object-cover"
                        fill
                      />
                    </div>
                    <span className="text-xs text-white">
                      {article.author?.fullname}
                    </span>
                    <span className="text-xs text-white">| {article.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 2 kolom bawah */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {bottomArticles.map((article) => (
          <div
            key={article.article_id}
            className="bg-white rounded-lg shadow p-4 hover:shadow-md transition flex gap-4 justify-center items-center"
          >
            {/* Gambar bisa diklik */}
            <Link href={`/artikel/${article.article_id}/${article.slug}`}>
              <Image
                src={article.image || "/default.jpg"}
                alt={article.title}
                className="w-40 h-24 object-cover rounded"
                width={160}
                height={96}
              />
            </Link>

            <div className="flex flex-col">
              {/* Judul bisa diklik */}
              <Link href={`/artikel/${article.article_id}/${article.slug}`}>
                <h2 className="text-lg font-semibold line-clamp-2 hover:underline">
                  {article.title}
                </h2>
              </Link>

              {/* Info penulis */}
              <div className="flex items-center gap-3 mt-3">
                <div className="relative w-[30px] h-[30px]">
                  <Image
                    src={article.author?.avatar || "/default.jpg"}
                    alt={article.author?.fullname}
                    className="rounded-full object-cover"
                    fill
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {article.author?.fullname}
                  </p>
                  <p className="text-xs text-gray-500">{article.date}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AdvBottomHead />
      <LatestNewsReg platformId={platformId} />
    </div>
  );
};

export default RegionPage;
