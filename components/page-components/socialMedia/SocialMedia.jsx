import React from 'react'
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const SocialMedia = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
    <h4 className="text-md font-bold text-red-600">Follow Us</h4>
    <div className="grid grid-cols-2 gap-4 mt-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gray-100 hover:bg-blue-100 rounded-lg py-3 transition"
      >
        <FaFacebookF className="text-blue-600 text-3xl" />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center text-black hover:text-white bg-gray-100 hover:bg-black rounded-lg py-3 transition"
      >
        <FaXTwitter className=" text-3xl" />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gray-100 hover:bg-red-100 rounded-lg py-3 transition"
      >
        <FaYoutube className="text-red-600 text-3xl" />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center bg-gray-100 hover:bg-pink-100 rounded-lg py-3 transition"
      >
        <FaInstagram className="text-pink-500 text-3xl" />
      </a>
    </div>
  </div>
  )
}

export default SocialMedia