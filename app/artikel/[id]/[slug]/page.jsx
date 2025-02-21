"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import headlines from "@/data/headline";
import News from "@/data/news";
import users from "@/data/users";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import olahraga from "@/data/sportNews";
import lifestyleNews from "@/data/lifestyleNews";
import Adv from "@/components/page-components/adv-sect/AdvBottomHead";
import Share from "@/components/share/Share";
import Follow from "@/components/follow/Follow";
import { FaPlay, FaStop } from "react-icons/fa";
import MostRead from "@/components/mostRead/MostRead";
import RelatedNews from "@/components/relatedNews/RelatedNews";
import editorChoice from "@/data/EditorChoice";

// 🔹 Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => {
  if (!authorId) return null; // Cek jika authorId undefined
  return users.find((user) => user.id === authorId) || null;
};

// Gabungkan semua artikel
const allArticles = [
  ...headlines,
  ...News,
  ...entertainmentNews,
  ...teknologiData,
  ...lifestyleNews,
  ...olahraga,
  ...editorChoice,
];

// 🔹 Urutkan berdasarkan views tertinggi untuk Most Read
const sortedArticles = allArticles
  .filter((article) => article.views !== undefined)
  .sort((a, b) => b.views - a.views);

const ArticlePage = () => {
  const router = useRouter(); // Inisialisasi router
  const params = useParams();
  const pathname = usePathname();
  const [article, setArticle] = useState(null);
  const [authorInfo, setAuthorInfo] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mostReadArticles, setMostReadArticles] = useState([]);
  const speechRef = useRef(null); // Untuk mengontrol Speech API

  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech tidak didukung di browser ini!");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const plainTextContent = article.content.replace(/<\/?[^>]+(>|$)/g, "");

      const utterance = new SpeechSynthesisUtterance(plainTextContent);
      utterance.lang = "id-ID"; // Bahasa Indonesia
      utterance.rate = 1; // Kecepatan pembacaan normal

      speechRef.current = utterance;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  useEffect(() => {
    if (!params?.id || !params?.slug) return;

    // 🔹 Cari artikel yang sedang dibuka
    const foundArticle = allArticles.find(
      (item) => item.id.toString() === params.id && item.slug === params.slug
    );

    if (foundArticle) {
      setArticle(foundArticle); // Simpan artikel utama

      if (foundArticle.authorId) {
        const authorData = getAuthorById(foundArticle.authorId);
        setAuthorInfo(authorData);
      }

      // 🔹 Ambil berita terkait berdasarkan kategori yang sama
      const related = allArticles
        .filter(
          (item) =>
            item.id !== foundArticle.id && // Jangan tampilkan artikel yang sedang dibuka
            item.category.some((cat) => foundArticle.category.includes(cat)) // Cek jika kategori sama
        )
        .slice(0, 4);
      setRelatedArticles(related);

      // 🔹 Ambil berita dengan views tertinggi untuk Most Read
      const mostRead = sortedArticles
        .filter((item) => item.id !== foundArticle.id) // Hindari artikel yang sedang dibuka
        .slice(0, 5);
      setMostReadArticles(mostRead);
    }
  }, [params?.id, params?.slug]);

  // ✅ FIX: Hentikan speech saat page refresh atau route berubah
  useEffect(() => {
    const stopSpeech = () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };

    // Hentikan speech jika user navigasi ke halaman lain
    return () => {
      stopSpeech();
    };
  }, [pathname]); // Setiap kali pathname berubah, stopSpeech() dipanggil

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
          <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col-reverse justify-between items-start py-8 2xl:gap-0 gap-6">
            {/* 🔹 Tombol Play (Untuk Membaca Artikel) */}
            <button
              onClick={toggleSpeech}
              aria-label={isSpeaking ? "Stop Reading" : "Play Article"}
              className={`flex items-center gap-1 px-4 py-2 rounded-lg transition ${
                isSpeaking
                  ? "bg-gray-500 text-white hover:bg-gray-600"
                  : "bg-pink-500 text-white hover:bg-pink-600"
              }`}
            >
              {isSpeaking ? (
                <FaStop className="w-8 h-8 p-2" />
              ) : (
                <FaPlay className="w-8 h-8 p-2" />
              )}
              {isSpeaking ? "Stop" : "Play"}
            </button>

            {/* 🔹 Render Author di Sebelah Kanan */}
            <div className="flex items-center space-x-2">
              {authorInfo && (
                <>
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
                  <span className="text-sm text-gray-700">
                    {authorInfo.name}
                  </span>
                  {/* Garis pemisah */}
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                  {/* Tanggal */}
                  <p className="text-gray-600 border-l border-l-gray-400 pl-3">
                    {new Date(article.date).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Gambar Artikel */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[400px] rounded-lg overflow-hidden mb-6">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* Konten Artikel */}
          <div
            className="mt-4 text-md leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <Share />
          {/* 🔹 Card untuk Semua Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-6 border border-gray-300 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, index) => (
              <button
                key={index}
                onClick={() => router.push(`/tag/${tag.toLowerCase().replace(/\s+/g, "-")}`)}
                className="px-4 py-3 text-sm font-semibold text-pink-600 bg-pink-100 hover:bg-pink-200 transition rounded-full"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

          {/* Share & Follow Section */}

          <Follow />
        </div>

        {/* Right Sidebar - Ads & Most Read */}
        <MostRead />
      </div>

      {/* Iklan bawah */}
      <Adv />

      {/* Related News Section */}
      <RelatedNews
        currentArticle={article}
        mostReadArticles={mostReadArticles}
      />
    </div>
  );
};

export default ArticlePage;
