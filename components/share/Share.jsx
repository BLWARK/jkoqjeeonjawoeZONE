"use client";

import React from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

import { FaXTwitter} from "react-icons/fa6";

const Share = ({ article }) => {
  if (!article) return null; // ✅ Jangan render jika artikel kosong

  const baseUrl = `https://xyzonemedia.com/artikel/${article.article_id}/${article.slug}`;
const shareUrls = {
  facebook: `${baseUrl}?utm_source=facebook`,
  twitter: `${baseUrl}?utm_source=twitter`,
  linkedin: `${baseUrl}?utm_source=linkedin`,
  whatsapp: `${baseUrl}?utm_source=whatsapp`,
};


  

 const handleShare = (platform) => {
  const encodedUrl = encodeURIComponent(shareUrls[platform]);
  const encodedTitle = encodeURIComponent(article.title || "");

  let url = "";
  switch (platform) {
    case "facebook":
      url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
      break;
    case "twitter":
      url = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`;
      break;
    case "linkedin":
      url = `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`;
      break;
    case "whatsapp":
      url = `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`;
      break;
    default:
      break;
  }
  window.open(url, "_blank");
};


  return (
    <div className="mt-8">
       <h3 className="2xl:text-[16px] text-[12px] font-bold mb-2">
        Share this article:
      </h3>
    <div className="flex gap-4 mt-4">
      {/* Facebook */}
      <button
        onClick={() => handleShare("facebook")}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-400 hover:text-white transition duration-300 group"
      >
        <FaFacebook size={24} />
      </button>

      {/* Twitter */}
      <button
        onClick={() => handleShare("twitter")}
       className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-gray-300 hover:bg-black hover:text-white transition duration-300 group"
      >
        <FaXTwitter size={24} />
      </button>

      {/* LinkedIn */}
      <button
        onClick={() => handleShare("linkedin")}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-800 hover:bg-blue-400 hover:text-white transition duration-300 group"
      >
        <FaLinkedin size={24} />
      </button>

      {/* WhatsApp */}
      <button
        onClick={() => handleShare("whatsapp")}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-green-600 hover:bg-green-400 hover:text-white transition duration-300 group"
      >
        <FaWhatsapp size={24} />
      </button>
    </div>
    </div>
  );
};

export default Share;
