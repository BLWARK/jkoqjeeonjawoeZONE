"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dapatkan tanggal hari ini

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="w-full max-w-[1200px] bg-gray-100">
      {/* Top Navbar */}
      

      {/* Main Navbar */}
      <div className="bg-gray-100">
        <div className="container mx-auto 2xl:py-6 flex justify-between items-center px-2">
          {/* Logo - Desktop */}
          <a href="/" className="hidden md:block relative w-40 h-10">
            <Image
              src="/Logo XYZone-Solid.png"
              alt="XYZONE Logo"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </a>

          {/* Join WhatsApp Button */}
          <a
            href="#"
            className="hidden md:flex items-center space-x-2 text-green-600 font-semibold hover:underline"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Join WhatsApp Channel</span>
          </a>
        </div>

        

        {/* Mobile Navbar */}
        <div className="bg-pink-600 md:hidden flex items-center justify-start gap-4 px-4 py-6">
          <button title="Hamburger Togle" aria-label="Hamburger" onClick={toggleMenu} className="text-white text-2xl">
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <div className="relative w-28 h-8">
            <Image
              src="/Logo XYZone White.png"
              alt="XYZONE Logo Mobile"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-100 p-4 space-y-4">
            <a href="#" className="block hover:underline">
              Home
            </a>
            <a href="#" className="block hover:underline">
              New Look
            </a>
            <a href="#" className="block hover:underline">7
              Fashion
            </a>
            <a href="#" className="block hover:underline">
              Lifestyle
            </a>
            <a href="#" className="block hover:underline">
              Business
            </a>
            <a href="#" className="block hover:underline">
              Art
            </a>
            <a href="#" className="block hover:underline">
              Technology
            </a>
            <a href="#" className="block hover:underline">
              Pages
            </a>
          </nav>
        )}
        {/* Menu Navigation */}
        <nav className=" bg-gray-100 w-full mt-2 ">
          <div className="container 2xl:px-0 px-2 2xl:font-thin font-medium 2xl:mx-auto xl:mx-auto lg:mx-auto overflow-auto flex justify-start items-center 2xl:space-x-4 py-6 border-b border-b-black border-t-4 border-black">
            <a href="https://lensaberitajakarta.com" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Berita
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="/entertainment" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Entertainment
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="/technology" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Technology
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="/sport" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Sport
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="/c-level" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2 ">
              C-Level
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="/lifestyle" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Lifestyle
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="#" className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              Komunitas
            </a>
            <div className="w-[1px] h-6 bg-gray-400"></div>

            <a href="https://www.youtube.com/@XYZoneTV" target="blank"  className="text-black whitespace-nowrap hover:underline 2xl:px-4 px-2">
              XYZONE TV
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
