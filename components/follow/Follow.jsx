import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const follow = () => {
  return (
    <div className="mt-12 border-t flex 2xl:flex-row flex-col 2xl:justify-between 2xl:items-center justify-start items-start gap-5 p-6 bg-gray-200 rounded-lg">
      <h3 className="text-sm font-light ">
        Stay inspired! Hit follow for more uplifting content and epic tales{" "}
      </h3>
      <div className="flex items-center gap-4">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-blue-600 transition duration-300 group"
        >
          <FaFacebookF
            className="text-blue-600 group-hover:text-white transition duration-300"
            size={20}
          />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-black transition duration-300 group"
        >
          <FaXTwitter
            className="text-black group-hover:text-white transition duration-300"
            size={20}
          />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 hover:bg-pink-500 transition duration-300 group"
        >
          <FaInstagram
            className="text-pink-500 group-hover:text-white transition duration-300"
            size={20}
          />
        </a>
      </div>
    </div>
  );
};

export default follow;
