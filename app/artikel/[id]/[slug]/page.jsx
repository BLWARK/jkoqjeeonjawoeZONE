"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import headlines from "@/data/headline";
import News from "@/data/news";
import PopularNews from "@/data/popularNews";
import users from "@/data/users";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import Adv from "@/components/page-components/adv-sect/AdvBottomHead";

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Gabungkan semua artikel
const allArticles = [
  ...headlines,
  ...News,
  ...PopularNews,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
];

const ArticlePage = () => {
  const params = useParams();
  const [article, setArticle] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    if (!params?.id || !params?.slug) return;

    // Cari artikel berdasarkan ID dan Slug
    const foundArticle = allArticles.find(
      (item) => item.id.toString() === params.id && item.slug === params.slug
    );

    if (foundArticle) {
      setArticle(foundArticle);

      // ✅ FIX: Ambil informasi author dari users.js
      const authorData = getAuthorById(foundArticle.authorId);
      setAuthorInfo(authorData);

      // ✅ FIX: Ambil berita terkait berdasarkan kategori yang sama
      const related = allArticles
        .filter(
          (item) =>
            item.id !== foundArticle.id &&
            item.category.includes(foundArticle.category[0])
        )
        .slice(0, 4);
      setRelatedArticles(related);
    }
  }, [params?.id, params?.slug]);

  if (!article) {
    return <p className="text-center py-10">Artikel tidak ditemukan...</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-10 2xl:px-0 px-3">
      
      {/* Iklan atas */}
      <Adv />

      <div className="2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 2xl:px-0 flex flex-col lg:flex-row gap-10">
        
        {/* Left Section - Article Content */}
        <div className="lg:w-[70%] w-full 2xl:border-r border-gray-300 2xl:pr-10 pr-0">
          {/* Judul & Tanggal */}
          <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
          <div className="flex justify-start items-center gap-3 py-5">
            {/* ✅ FIX: Render Author */}
            {authorInfo && (
              <div className="flex items-center space-x-2">
                {authorInfo.photo ? (
                  <Image
                    src={authorInfo.photo}
                    alt={authorInfo.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                )}
                <span className="text-sm text-gray-700">{authorInfo.name}</span>
              </div>
            )}
            <p className="text-gray-600 border-l border-l-gray-400 pl-3">
              {new Date(article.date).toLocaleDateString()}
            </p>
          </div>

          {/* Gambar Artikel */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image src={article.image} alt={article.title} fill className="object-cover" />
          </div>

          {/* Konten Artikel */}
          <div className="mt-4 text-md leading-relaxed" dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>

        {/* Right Sidebar - Ads & Most Read */}
        <div className="lg:w-[30%] w-full flex flex-col gap-6">
          
          {/* Ads Section 1 */}
          <div className="w-full">
            <Image src="/ads/ad1.jpg" alt="Advertisement" width={300} height={250} className="rounded-lg mx-auto" />
          </div>

          {/* Ads Section 2 */}
          <div className="w-full">
            <Image src="/ads/ad2.jpg" alt="Advertisement" width={300} height={250} className="rounded-lg mx-auto" />
          </div>

          {/* Most Read Section */}
          <div>
            <h2 className="text-2xl font-bold text-pink-500">Most Read</h2>
            <div className="w-[50%] h-[5px] bg-pink-500 mb-5 rounded-full"></div>
            <div className="flex flex-col gap-4">
              {PopularNews.slice(0, 4).map((news) => (
                <div key={news.id} className="flex flex-col border-b border-gray-300 py-3">
                  {/* Gambar */}
                  <div className="relative w-full 2xl:h-[200px] h-[250px]">
                    <Image src={news.image} alt={news.title} fill className="rounded-lg object-cover" />
                  </div>

                  {/* Judul */}
                  <div className="mt-2">
                    <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
                      <h4 className="text-md font-semibold hover:underline cursor-pointer">
                        {news.title}
                      </h4>
                    </Link>
                  </div>

                  {/* Tanggal */}
                  <span className="text-gray-500 text-sm">{news.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Iklan bawah */}
      <Adv />

      {/* Related News Section */}
      {/* Related News Section */}
{relatedArticles.length > 0 && (
  <div className="mt-10">
    <h2 className="text-2xl font-bold text-pink-500">Berita Terkait</h2>
    <div className="w-[10%] h-[5px] bg-pink-500 mb-5 rounded-full my-5"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedArticles.map((news) => {
        const author = getAuthorById(news.authorId); // ✅ Ambil author berdasarkan `authorId`

        return (
          <div key={news.id} className="flex flex-col">
            {/* Gambar */}
            <div className="relative w-full h-[200px]">
              <Image src={news.image} alt={news.title} fill className="rounded-lg object-cover" />
            </div>

            {/* Judul */}
            <Link href={`/artikel/${news.id}/${news.slug}`} passHref>
              <h4 className="text-md font-semibold hover:underline cursor-pointer mt-2">
                {news.title}
              </h4>
            </Link>

            {/* Author & Date */}
            <div className="flex items-center text-sm text-gray-500 mt-2">
              {author?.photo && (
                <Image
                  src={author.photo}
                  alt={author.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              )}
              <span className="ml-2">{author?.name || "Unknown Author"}</span>

              {/* Garis pemisah */}
              <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
              
              {/* Tanggal */}
              <span>{new Date(news.date).toLocaleDateString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
)}

    </div>
  );
};

export default ArticlePage;
