"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import headlines from "@/data/headline"; // Import data headline
import PilihanEditor from "@/data/EditorChoice"; // Import data EditorChoice
import PopularNews from "@/data/popularNews";
import News from "@/data/news";
import users from "@/data/users"; // Import data users untuk author info
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews"
import lifestyleNews from "@/data/lifestyleNews";

const ArticlePage = () => {
  const params = useParams(); // Ambil parameter dari URL
  const [article, setArticle] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);

  useEffect(() => {
    if (!params?.id || !params?.slug) return;

    // Gabungkan semua data dari headlines & PilihanEditor
    const allArticles = [...headlines, ...PilihanEditor, ...News, ...PopularNews, ...entertainmentNews, ...teknologiData, ...lifestyleNews, ...olahraga];

    // Cari artikel berdasarkan ID dan Slug
    const foundArticle = allArticles.find(
      (item) => item.id.toString() === params.id && item.slug === params.slug
    );

    if (foundArticle) {
      setArticle(foundArticle);

      // Ambil informasi author dari users.js
      const authorData = foundArticle.authorIds
        .map((authorId) => users.find((user) => user.id === authorId))
        .filter(Boolean); // Hapus data yang undefined
      setAuthorInfo(authorData);
    }
  }, [params?.id, params?.slug]);

  if (!article) {
    return <p className="text-center py-10">Artikel tidak ditemukan...</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-4">
        
        {/* Judul & Tanggal */}
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <div className="flex justify-start items-center gap-3 py-5">
      {/* Tampilkan informasi author */}
      {authorInfo && authorInfo.length > 0 && (
        <div className="flex items-center ">
          {authorInfo.map((author) => (
            <div key={author.id} className="flex items-center space-x-2">
              <Image
                src={author.photo}
                alt={author.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <span className="text-sm text-gray-700 ">{author.name}</span>
            </div>
          ))}
        </div>
      )}
      
      <p className="text-gray-600 border-l border-l-gray-400  pl-3">{article.date}</p>
      </div>
      

      {/* Gambar Artikel */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px] rounded-lg overflow-hidden mb-6">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      
      

      {/* Tampilkan konten artikel */}
      <div
        className="mt-4 text-lg leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default ArticlePage;
