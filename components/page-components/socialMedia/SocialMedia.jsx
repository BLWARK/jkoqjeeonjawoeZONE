import React from "react";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h4 className="text-md font-bold text-red-600">Follow Us</h4>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <a
          href="https://www.tiktok.com/@xyzonemedia?_t=ZS-8wDy2fTaIBE&_r=1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="tiktok" /* ✅ Tambahkan label aksesibilitas */
          className="flex items-center justify-center bg-gray-200 hover:bg-blue-200 rounded-lg py-3 transition"
        >
          <AiFillTikTok className="text-black text-3xl" />
          <span className="sr-only">Tiktok</span>{" "}
          {/* ✅ Tambahkan teks tersembunyi untuk screen reader */}
        </a>
        <a
          href="https://x.com/xyzoneupdate?s=21"
          target="_blank"
          aria-label="twitter" 
          rel="noopener noreferrer"
          className="flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-black rounded-lg py-3 transition"
        >
          <FaXTwitter className=" text-3xl" />
        </a>
        <a
          href="https://www.youtube.com/@XYZoneTV"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Youtube" /* ✅ Tambahkan label aksesibilitas */
          className="flex items-center justify-center bg-gray-100 hover:bg-red-100 rounded-lg py-3 transition"
        >
          <FaYoutube className="text-red-600 text-3xl" />
        </a>
        <a
          href="https://www.instagram.com/xyzonemedia?igsh=NzNoaTF3aDc3aDM2"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram" /* ✅ Tambahkan label aksesibilitas */
          className="flex items-center justify-center bg-gray-100 hover:bg-pink-100 rounded-lg py-3 transition"
        >
          <FaInstagram className="text-pink-500 text-3xl" />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
