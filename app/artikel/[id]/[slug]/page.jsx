"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import Image from "next/image";
import { useBackContext } from "@/context/BackContext";
import Adv from "@/components/page-components/adv-sect/AdvBottomHead";
import Share from "@/components/share/Share";
import Follow from "@/components/follow/Follow";
import { FaPlay, FaStop } from "react-icons/fa";
import MostRead from "@/components/mostRead/MostRead";
import RelatedNews from "@/components/relatedNews/RelatedNews";
import Tracking from "@/components/Tracking";
import he from "he"; // ✅ Import library untuk decode HTML escape\

const ArticlePage = () => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const [pages, setPages] = useState([]);
  const searchParams = useSearchParams();
  const rawPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(rawPage - 1);
  const [showAll, setShowAll] = useState(rawPage === pages.length); // ⬅️ aktif kalau page = pages.length + 1

  const { getArticleBySlug, currentArticle } = useBackContext();
  const [authorInfo, setAuthorInfo] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const fetchedSlugRef = useRef(null);
  const speechRef = useRef(null);
  const BASE_URL = "http://156.67.217.169:9001";
  const DEFAULT_IMAGE = "/default-image.jpg"; // 🔥 Pakai gambar lokal sebagai fallback

  // ✅ Ambil data artikel berdasarkan `slug` atau `id`
  useEffect(() => {
    if (params?.slug && params.slug !== fetchedSlugRef.current) {
      fetchedSlugRef.current = params.slug;
      getArticleBySlug(params.slug);
    }
  }, [params?.slug]);

  // ✅ Set author setelah article berhasil didapat
  useEffect(() => {
    if (currentArticle?.author) {
      setAuthorInfo(currentArticle.author);
    }
  }, [currentArticle]);

  useEffect(() => {
    setShowAll(rawPage === pages.length + 1);
  }, [rawPage, pages.length]);

  const splitHtmlContent = (html, maxChars = 4000) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Tambahkan caption setelah setiap <img> yang punya alt
    const images = doc.querySelectorAll("img[alt]");
    images.forEach((img) => {
      const altText = img.getAttribute("alt");
      if (altText) {
        const caption = document.createElement("small");
        caption.textContent = altText;
        caption.style.display = "block";
        caption.style.textAlign = "left";
        caption.style.color = "#666";
        caption.style.fontSize = "0.8rem";
        caption.style.marginTop = "4px";

        img.insertAdjacentElement("afterend", caption);
      }
    });

    let chunks = [];
    let temp = "";
    let count = 0;

    const children = Array.from(doc.body.childNodes);

    children.forEach((node) => {
      const htmlString = node.outerHTML || node.textContent;
      const length = htmlString.length;

      if (count + length > maxChars) {
        chunks.push(temp);
        temp = htmlString;
        count = length;
      } else {
        temp += htmlString;
        count += length;
      }
    });

    if (temp) {
      chunks.push(temp);
    }

    return chunks;
  };

  useEffect(() => {
    if (currentArticle?.content) {
      const decoded = he.decode(currentArticle.content);
      const splitted = splitHtmlContent(decoded, 4000);
      setPages(splitted);
      setCurrentPage(0);
    }
  }, [currentArticle]);

  useEffect(() => {
    if (currentArticle?.content.includes("twitter-tweet")) {
      console.log("🚀 Twitter embed detected");

      if (window.twttr) {
        window.twttr.widgets.load();
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.charset = "utf-8";

        script.onload = () => {
          console.log("✅ Twitter script loaded");
          setTimeout(() => {
            if (window.twttr) {
              window.twttr.widgets.load(); // ✅ Render ulang embed
              console.log("✅ Twitter embed loaded");
            }
          }, 100);
        };

        document.body.appendChild(script);
      }
    }
  }, [currentArticle]);

  // ✅ Fungsi untuk membaca artikel dengan Speech API
  const toggleSpeech = () => {
    if (!window.speechSynthesis) {
      alert("Text-to-Speech tidak didukung di browser ini!");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const plainTextContent = currentArticle.content.replace(
        /<\/?[^>]+(>|$)/g,
        ""
      );

      const utterance = new SpeechSynthesisUtterance(plainTextContent);
      utterance.lang = "id-ID";
      utterance.rate = 1;

      speechRef.current = utterance;

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
    }
  };

  // ✅ Hentikan speech saat pindah halaman atau refresh
  useEffect(() => {
    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
    };
  }, [pathname]);

  // ✅ Deteksi embed Twitter → Load script Twitter
  useEffect(() => {
    if (currentArticle?.content.includes("twitter-tweet")) {
      console.log("🚀 Twitter embed detected");

      // Coba hapus script sebelumnya jika ada
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );
      if (existingScript) {
        existingScript.remove();
      }

      // Tambahkan script baru
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.charset = "utf-8";

      script.onload = () => {
        console.log("✅ Twitter script loaded");
        if (window.twttr) {
          setTimeout(() => {
            window.twttr.widgets.load(); // ✅ Trigger ulang load embed
            console.log("✅ Twitter embed loaded");
          }, 100);
        }
      };

      document.body.appendChild(script);
    }
  }, [currentArticle]);

  // ✅ Deteksi embed Twitter → Load script Tiktok
  useEffect(() => {
   const timeout = setTimeout(() => {
    // Twitter
    if (document.querySelector(".twitter-tweet")) {
      if (window?.twttr?.widgets) {
        window.twttr.widgets.load();
        console.log("✅ Twitter embed reloaded (slug changed)");
      } else {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => {
          window?.twttr?.widgets?.load();
          console.log("✅ Twitter script injected");
        };
        document.body.appendChild(script);
      }
    }
  }, 300); // delay sedikit agar konten benar-benar masuk

  return () => clearTimeout(timeout);
}, [currentArticle?.content, currentPage]); // gunakan slug sebagai trigger

  // ✅ Deteksi embed Twitter → Load script Instagram
  useEffect(() => {
    const hasInstagram = document.querySelector(".instagram-media");

    if (
      hasInstagram &&
      !document.querySelector('script[src*="instagram.com/embed.js"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://www.instagram.com/embed.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (window.instgrm) {
          window.instgrm.Embeds.process(); // ✅ Proses embed setelah script dimuat
        }
      };
      document.body.appendChild(script);
    } else {
      // Jika script sudah ada, re-process
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    }
  }, [currentArticle]);

  useEffect(() => {
    // Twitter
    if (document.querySelector(".twitter-tweet")) {
      const existingScript = document.querySelector(
        'script[src="https://platform.twitter.com/widgets.js"]'
      );
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        window?.twttr?.widgets?.load();
      };
      document.body.appendChild(script);
    }

    // TikTok
    if (document.querySelector(".tiktok-embed")) {
      const existingScript = document.querySelector(
        'script[src="https://www.tiktok.com/embed.js"]'
      );
      if (existingScript) existingScript.remove();

      const script = document.createElement("script");
      script.src = "https://www.tiktok.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Instagram
    if (document.querySelector(".instagram-media")) {
      const existingScript = document.querySelector(
        'script[src*="instagram.com/embed.js"]'
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => {
          window?.instgrm?.Embeds?.process();
        };
        document.body.appendChild(script);
      } else {
        window?.instgrm?.Embeds?.process();
      }
    }
  }, [currentPage]);

  if (!currentArticle) {
    return <p className="text-center py-10">Artikel tidak ditemukan...</p>;
  }

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-2 px-3">
      {/* 🔹 Tracking Komponen ✅ */}
      <Tracking />

      {/* 🔹 Iklan atas */}
      <Adv />

      <div className="2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-0 2xl:px-0 xl:px-0 lg:px-0 flex flex-col lg:flex-row gap-10 ">
        {/* Left Section - Article Content */}
        <div className="lg:w-[70%] w-full 2xl:border-r border-gray-300 2xl:pr-10 pr-0 pt-5">
          {/* Judul & Tanggal */}
          <h1 className="text-3xl font-bold ">{currentArticle.title}</h1>
          <div className="flex 2xl:flex-row xl:flex-row lg:flex-row flex-col-reverse justify-between 2xl:items-center xl:items-center lg:items-center items-start py-8 2xl:gap-0 gap-6">
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
                  {authorInfo.avatar ? (
                    <Image
                      // src={authorInfo.avatar || "/default.jpg"}
                      src={"/default.jpg"}
                      alt={authorInfo.username}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  )}
                  <span className="text-sm text-gray-700">
                    {authorInfo.username}
                  </span>
                  {/* Garis pemisah */}
                  <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>

                  {/* Tanggal */}
                  <p className="text-gray-600">
                    {new Date(currentArticle.date).toLocaleDateString()}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Gambar Artikel */}
          <div className="relative w-full h-[300px] rounded-lg overflow-hidden mb-2">
            <Image
              src={
                currentArticle.image
                  ? `${BASE_URL}/${currentArticle.image}`
                  : DEFAULT_IMAGE
              }
              alt={currentArticle.title || "Gambar tidak tersedia"}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>

          {/* ✅ Caption gambar utama */}
          {currentArticle.caption && (
            <p className="text-sm text-gray-500 mt-2 text-left mb-5 italic">
              {currentArticle.caption}
            </p>
          )}

          {/* Konten Artikel */}
          <div
            className="
            [&_iframe]:w-full [&_iframe]:h-[400px] [&_iframe]:rounded-lg
            [&_p]:mb-4 
            [&_p]:leading-relaxed 
            [&_a]:text-blue-600 
            [&_a]:hover:underline 
            [&_a]:italic
            [&_table]:w-full 
            [&_table]:border 
            [&_th]:border 
            [&_td]:border 
            [&_td]:p-2 
            [&_th]:p-2 
            [&_thead]:bg-gray-100 
            [&_table]:my-6 
            [&_table]:text-sm
            [&_blockquote.tiktok-embed]:w-full [&_blockquote.tiktok-embed]:!max-w-full
            
            
          "
            dangerouslySetInnerHTML={{
              __html: showAll ? pages.join("") : pages[currentPage] || "",
            }}
          />

          <div className="flex justify-center mt-4 gap-2 flex-wrap">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentPage(index);
                  router.push(`${pathname}?page=${index + 1}`, {
                    scroll: false,
                  });
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`px-4 py-2 rounded ${
                  !showAll && index === currentPage
                    ? "bg-pink-500 text-white font-bold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Tombol Show All di akhir */}
            <button
              onClick={() => {
                router.push(`${pathname}?page=${pages.length + 1}`, {
                  scroll: false,
                });
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`px-4 py-2 rounded ${
                showAll
                  ? "bg-gray-200 text-gray-700  font-bold"
                  : "bg-pink-500 text-white hover:bg-gray-300"
              }`}
            >
              show all
            </button>
          </div>

          <Share article={currentArticle} />

          {/* 🔹 Card untuk Semua Tags */}
          {/* 🔹 Card untuk Semua Tags */}
          {(Array.isArray(currentArticle.tags) ||
            typeof currentArticle.tags === "string") &&
            (() => {
              // Konversi tag menjadi array
              const tagList = Array.isArray(currentArticle.tags)
                ? currentArticle.tags
                : currentArticle.tags.split(",").map((tag) => tag.trim());

              return tagList.length > 0 ? (
                <div className="mt-6 border border-gray-300 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tagList.map((tag, index) => (
                      <button
                        key={index}
                        onClick={() =>
                          router.push(
                            `/tag/${tag
                              .toLowerCase()
                              .replace(/\s+/g, "-")}?platform_id=${
                              currentArticle.platform_id
                            }`
                          )
                        }
                        className="px-4 py-3 text-sm font-semibold text-pink-600 bg-pink-100 hover:bg-pink-200 transition rounded-full"
                      >
                        {tag
                          .replace(/-/g, " ")
                          .replace(/\b\w/g, (char) => char.toUpperCase())}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

          {/* Share & Follow Section */}

          <Follow />
        </div>

        {/* Right Sidebar - Ads & Most Read */}
        <MostRead />
      </div>

      {/* 🔹 Iklan Bawah */}
      <Adv />

      {/* 🔹 Related News */}
      <RelatedNews currentArticle={currentArticle} />
    </div>
  );
};

export default ArticlePage;
