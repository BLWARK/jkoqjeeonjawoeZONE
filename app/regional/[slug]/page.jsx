"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link"
import React from "react";
import regionArticles from "@/data/regionArticles";
import regionPlatformMap from "@/data/regionPlatformMap";
import LatestNews from "@/components/page-components/latestNews/LatestNews";
import AdvBottomHead from "@/components/page-components/adv-sect/AdvBottomHead";
import { useBackContext } from "@/context/BackContext";

const RegionPage = () => {
  const { slug } = useParams();
const platformId = regionPlatformMap[slug];

const { getHeadlines, headlines } = useBackContext();

const [featured, setFeatured] = useState(null);
const [sideArticles, setSideArticles] = useState([]);
const [bottomArticles, setBottomArticles] = useState([]);

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
    <div className="w-full 2xl:max-w-[1200px] mx-auto py-8 px-4 space-y-6">
      {/* Top Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Berita Utama */}
        {featured && (
          <div className="relative lg:col-span-2 h-[400px] rounded-lg overflow-hidden group">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover"
            />
            <Link href={`/artikel/${featured.article_id}/${featured.slug}`}>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
              <h2 className="text-white text-2xl font-bold line-clamp-2">
                {featured.title}
              </h2>
              <p className="text-sm text-white mt-2 line-clamp-2">{featured.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <img
                  src={featured.author?.avatar || "/default.jpg"}
                  alt={featured.author?.fullname}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-xs text-white">{featured.author?.fullname}</span>
                <span className="text-xs text-white">| {featured.date}</span>
              </div>
            </div>
            </Link>
          </div>
        )}

        {/* Samping 2 Berita */}
        <div className="flex flex-col gap-4">
          {sideArticles.map((article) => (
            <Link key={article.article_id} href={`/artikel/${article.article_id}/${article.slug}`}>
            <div className="relative h-[190px] rounded-lg overflow-hidden group">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover "
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold line-clamp-2">{article.title}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={article.author?.avatar || "/default.jpg"}
                    alt={article.author?.fullname}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-xs text-white">{article.author?.fullname}</span>
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
          <div key={article.article_id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition flex gap-4 justify-center items-center">
            <img
              src={article.image}
              alt={article.title}
              className="w-40 h-24 object-cover rounded"
            />
            <div className="flex flex-col">
            <h2 className="text-lg font-semibold  line-clamp-2">{article.title}</h2>
            <div className="flex items-center gap-3 mt-3">
              <img
                src={article.author?.avatar || "/default.jpg"}
                alt={article.author?.fullname}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{article.author?.fullname}</p>
                <p className="text-xs text-gray-500">{article.date}</p>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
      <AdvBottomHead/>
      <LatestNews platformId={platformId} />
    </div>
  );
};

export default RegionPage;
