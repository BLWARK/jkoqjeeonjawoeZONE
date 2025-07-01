"use client";

import React, { useState } from "react";
import { FaFacebook, FaLinkedin, FaWhatsapp, FaCopy } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";
import Swal from "sweetalert2";

const Share = ({ article }) => {
  const [isOpen, setIsOpen] = useState(false);
  if (!article) return null;

  const baseUrl = `https://xyzonemedia.com/artikel/${article.article_id}/${article.slug}`;
  const shareUrls = {
    facebook: `${baseUrl}?utm_source=facebook`,
    twitter: `${baseUrl}?utm_source=twitter`,
    linkedin: `${baseUrl}?utm_source=linkedin`,
    whatsapp: `${baseUrl}?utm_source=whatsapp`,
    clean: baseUrl,
  };

  const encodedTitle = encodeURIComponent(article.title || "");

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(shareUrls[platform]);
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

    if (url) window.open(url, "_blank");
  };

  const handleCopy = async (url, type = "biasa") => {
    try {
      await navigator.clipboard.writeText(url);
      Swal.fire({
        icon: "success",
        title:
          type === "whatsapp"
            ? "Link WhatsApp Channel disalin!"
            : "Link disalin!",
        text: "Silakan paste link ini ke media yang kamu inginkan.",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsOpen(false);
    } catch (err) {
      console.error("❌ Gagal salin:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Gagal menyalin link!",
      });
    }
  };

  return (
    <div className="mt-8">
      <h3 className="2xl:text-[16px] text-[12px] font-bold mb-2">
        Share this article:
      </h3>

      {/* Tombol-tombol share individual */}
      <div className="flex gap-4 mt-4 flex-wrap">
        <button
          onClick={() => handleShare("facebook")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-600 hover:bg-blue-400 transition"
        >
          <FaFacebook size={24} />
        </button>

        <button
          onClick={() => handleShare("twitter")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-black bg-gray-300 hover:bg-black hover:text-white transition"
        >
          <FaXTwitter size={24} />
        </button>

        <button
          onClick={() => handleShare("linkedin")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-blue-800 hover:bg-blue-400 transition"
        >
          <FaLinkedin size={24} />
        </button>

        <button
          onClick={() => handleShare("whatsapp")}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-green-600 hover:bg-green-400 transition"
        >
          <FaWhatsapp size={24} />
        </button>

        {/* Tombol Share tambahan */}
        <button
          onClick={() => setIsOpen(true)}
          className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-gray-700 hover:bg-gray-500 transition"
        >
          <IoShareSocial size={24} />
        </button>
      </div>

      {/* Modal Share */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div
            className="bg-white rounded-lg p-6 w-[320px] shadow-lg relative
            transform transition-all duration-300 ease-out translate-y-8 opacity-0
            animate-modal-fade-in"
          >
            <h3 className="text-lg font-semibold mb-4">Bagikan artikel:</h3>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
              >
                <FaFacebook /> Facebook
              </button>

              <button
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 p-2 bg-black text-white rounded hover:bg-gray-800"
              >
                <FaXTwitter /> Twitter
              </button>

              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 p-2 bg-blue-800 text-white rounded hover:bg-blue-700"
              >
                <FaLinkedin /> LinkedIn
              </button>

              <button
                onClick={() => handleShare("whatsapp")}
                className="flex items-center gap-2 p-2 bg-green-600 text-white rounded hover:bg-green-500"
              >
                <FaWhatsapp /> WhatsApp
              </button>
            </div>

            <hr className="mb-4" />

            <div className="space-y-2 text-sm">
              {/* Salin link biasa */}
              <button
                onClick={() => handleCopy(shareUrls.clean, "biasa")}
                className="flex items-center gap-2 text-gray-700 hover:text-black"
              >
                <FaCopy /> Salin link biasa
              </button>

              {/* Salin link WhatsApp Channel */}
              <button
                onClick={() => handleCopy(shareUrls.whatsapp, "whatsapp")}
                className="flex items-center gap-2 text-green-700 hover:text-green-900"
              >
                <FaCopy /> Salin link untuk WhatsApp Channel
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              ✖
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Share;
