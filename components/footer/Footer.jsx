import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 w-screen">
      <div className="2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Left Section - Logo & Description */}
        <div>
          <Image
            src="/Logo XYZone White.png"
            alt="Logo"
            width={150}
            height={50}
          />
          <p className="text-sm text-gray-400 mt-6">
            XYZONEMEDIA adalah platform berita terbaru yang menyajikan informasi
            lifestyle, entertainment, dan teknologi dengan cepat dan akurat.
          </p>
        </div>

        {/* Center Left - Categories */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-pink-500">Category</h4>
          <ul className="text-sm text-gray-200 space-y-6">
            <li>
              <Link href="/entertainment" className=" hover:text-pink-500">
                Entertainment
              </Link>
            </li>
            <li>
              <Link href="/lifestyle" className=" hover:text-pink-500">
                Lifestyle
              </Link>
            </li>
            <li>
              <Link href="/technology" className=" hover:text-pink-500">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/sport" className=" hover:text-pink-500">
                Sport
              </Link>
            </li>
            <li>
              <Link href="/c-level" className=" hover:text-pink-500">
                C-Level
              </Link>
            </li>
          </ul>
        </div>

        {/* Center Right - XYZONEMEDIA Info */}
        <div>
          <h4 className="text-lg font-semibold mb-6 text-pink-500">
            XYZONEMEDIA
          </h4>
          <ul className="text-sm text-gray-200 space-y-6 ">
            <li>
              <Link href="/#" className=" hover:text-pink-500">
                Visi dan Misi
              </Link>
            </li>
            <li>
              <Link href="/#" className=" hover:text-pink-500">
                Susunan Redaksi
              </Link>
            </li>
            <li>
              <Link href="/#" className=" hover:text-pink-500">
                Disclaimer
              </Link>
            </li>
            <li>
              <Link href="/#" className=" hover:text-pink-500">
                Kontak Kami
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Social Media */}
        <div>
          <h4 className="text-lg font-semibold mb-3 text-pink-500">
            Follow Us
          </h4>
          <div className="flex space-x-4">
            <Link
              href="https://twitter.com"
              target="blank"
              aria-label="twitter"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaTwitter />
            </Link>
            <Link
              href="https://instagram.com"
              target="blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://facebook.com"
              target="blank"
              aria-label="Facebook"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://youtube.com"
              target="blank"
              aria-label="Youtube"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 text-2xl"
            >
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col-reverse md:flex-row justify-between items-center  text-sm text-gray-400 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto px-6  gap-8">
        {/* Copyright */}
        <p className="italic">
          © 2025 XYZ Creative Group. All Rights Reserved.
        </p>

        {/* Additional Links */}
        <div className="flex space-x-6">
          <Link href="/kontak" className="hover:text-pink-500">
            Kontak
          </Link>
          <Link href="/advertise" className="hover:text-pink-500">
            Advertise
          </Link>
          <Link href="/ecosystem" className="hover:text-pink-500">
            Ekosistem
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
