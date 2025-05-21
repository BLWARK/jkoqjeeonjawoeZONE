"use client";

import { useParams, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useBackContext } from "@/context/BackContext";
import MostReadTag from "@/components/mostRead/MostReadTag";

const ARTICLES_PER_PAGE = 10;

const TagPage = () => {
  const params = useParams();
  const { tag } = params;
  const {
    getArticlesByTag,
    articlesByTag,
    articlesByTagMeta,
    
  } = useBackContext();

  const [currentPage, setCurrentPage] = useState(1);
  const [matchedTag, setMatchedTag] = useState(tag);
  

const [platformId, setPlatformId] = useState(null);;
const searchParams = useSearchParams();
const platformIdFromQuery = searchParams.get("platform_id");


useEffect(() => {
  const platformIdRaw = searchParams.get("platform_id");
  if (platformIdRaw) {
    console.log("🎯 Search param platform_id changed:", platformIdRaw);
    setPlatformId(Number(platformIdRaw));
  }
}, [searchParams.toString()]); // <- KUNCI DI SINI



// useEffect(() => {
//   const resolvePlatform = async () => {
//     if (!slug) return;

//     console.log("🔎 Slug:", slug);

//     if (!platformSlugToId?.[slug]) {
//       if (!hasFetchedPlatforms) {
//         console.log("🌐 Fetching platform mapping...");
//         await getAllPlatforms();
//         setHasFetchedPlatforms(true);
//       }
//       return;
//     }

//     const pid = platformSlugToId[slug];
//     console.log("✅ Resolved platformId:", pid);
//     if (pid) setPlatformId(pid);
//   };

//   resolvePlatform();
// }, [slug, platformSlugToId, hasFetchedPlatforms]);




useEffect(() => {
  if (tag && platformIdFromQuery) {
    console.log("🚀 Fetch by tag:", tag, "platform:", platformIdFromQuery);
    getArticlesByTag(tag, Number(platformIdFromQuery), currentPage, ARTICLES_PER_PAGE);
  }
}, [tag, platformIdFromQuery, currentPage]);





  const normalizeTag = (t) => t?.toLowerCase().replace(/[-\s]/g, "");

  // ✅ Ambil tag yang sesuai dari data yang sudah ada
  useEffect(() => {
    if (!tag) return;

    const findMatchingTag = () => {
      const normalizedParam = normalizeTag(tag);

      const allTags = articlesByTag.flatMap((a) =>
        Array.isArray(a.tags) ? a.tags : []
      );

      const uniqueTags = [...new Set(allTags)];
      const match = uniqueTags.find((t) => normalizeTag(t) === normalizedParam);

      return match || tag;
    };

    const resolvedTag = findMatchingTag();
    setMatchedTag(resolvedTag);
    setCurrentPage(1); // reset page
  }, [tag]);

 



  const goToNextPage = () => {
    if (currentPage < articlesByTagMeta?.totalPages) {
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
        Tag: {tag.replace(/-/g, " ")}
      </h2>
      <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="2xl:col-span-2 xl:col-span-2 lg:col-span-2 col-span-1">
          {articlesByTag.map((article) => (
            <div
              key={article.article_id}
              className="flex flex-col lg:flex-row gap-6 border-b pb-4 border-b-gray-200 mt-4"
            >
              <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                <div className="relative w-full lg:w-[300px] h-[150px]">
                  <Image
                    src={article.image || "/default.jpg"}
                    alt={article.title}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1 flex-col justify-between">
                <Link href={`/artikel/${article.article_id}/${article.slug}`} passHref>
                  <h2 className="text-lg font-bold hover:underline cursor-pointer">
                    {article.title}
                  </h2>
                </Link>
                <div className="flex items-center text-sm text-gray-500 mt-2">
                  {article.author?.avatar ? (
                    <Image
                      src={article.author.avatar}
                      
                      alt={article.author.fullname}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-6 h-6 bg-gray-300 rounded-full" />
                  )}
                  <span className="ml-2">{article.author?.fullname || "Unknown"}</span>
                  <div className="w-[1px] h-5 bg-gray-300 mx-2" />
                  <span>{new Date(article.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Pagination */}
          {articlesByTagMeta?.totalPages > 1 && (
            <div className="flex justify-between items-center mt-10">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 text-white rounded-lg ${
                  currentPage === 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                Previous
              </button>
              <span className="text-gray-700 font-semibold">
                Page {currentPage} of {articlesByTagMeta.totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === articlesByTagMeta.totalPages}
                className={`px-4 py-2 text-white rounded-lg ${
                  currentPage === articlesByTagMeta.totalPages
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-pink-500 hover:bg-pink-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* 🔹 Sidebar */}
        <div className="w-full 2xl:border-l xl:border-l lg:border-l border-l-gray-300 2xl:pl-5 xl:pl-5 lg:pl-5">
          <MostReadTag />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
