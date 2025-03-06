"use client";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import DropdownMenu from "@/components/navigation/DropDownMenu";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null); // State untuk delay

  // Fungsi Toggle Menu Mobile
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Fungsi Menampilkan Dropdown dengan Delay
  const handleMouseEnter = (category) => {
    if (dropdownTimeout) clearTimeout(dropdownTimeout);
    setHoveredCategory(category);
  };

  // Fungsi Menghilangkan Dropdown dengan Delay
  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCategory(null);
    }, 30); // Delay 300ms agar tidak langsung hilang
    setDropdownTimeout(timeout);
  };

  return (
    <div className="w-full max-w-[1200px] 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1000px] bg-gray-100">
      {/* Main Navbar */}
      <div className="bg-gray-100">
        <div className="container mx-auto 2xl:py-6 xl:py-6 lg:py-6 flex justify-between items-center px-2">
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
          <button
            title="Hamburger Toggle"
            aria-label="Hamburger"
            onClick={toggleMenu}
            className="text-white text-2xl"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
          <a href="/" className="relative w-28 h-8">
            <Image
              src="/Logo XYZone White.png"
              alt="XYZONE Logo Mobile"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              style={{ objectFit: "contain" }}
            />
          </a>
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
            <a href="#" className="block hover:underline">
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
        <nav className="bg-gray-100 w-full mt-2 relative  ">
          <div className="2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1000px] flex justify-start items-center space-x-4 py-6 border-b  border-black border-t-4 overflow-x-auto">
            <a
              href="https://lensaberitajakarta.com"
              target="blank"
              className="text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300"
            >
              Berita
            </a>
            {[
              {
                name: "Entertainment",
                path: "/entertainment",
                category: "entertainment",
              },
              {
                name: "Technology",
                path: "/technology",
                category: "technology",
              },
              { name: "Sport", path: "/sport", category: "sport" },
              { name: "C-Level", path: "/c-level", category: "c-level" },
              { name: "Lifestyle", path: "/lifestyle", category: "lifestyle" },
            ].map((menu) => (
              <div
                key={menu.name}
                className="relative group "
                onMouseEnter={() => handleMouseEnter(menu.category)}
                onMouseLeave={handleMouseLeave}
              >
                <a
                  href={menu.path}
                  className="text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10 "
                >
                  {menu.name}
                </a>
              </div>
            ))}

            <a href="https://www.youtube.com/@XYZoneTV" target="blank" className="hidden md:block relative w-28 h-10">
              <Image
                src="/Logo OneZone TV.png"
                alt="XYZONETV"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </a>
          </div>
        </nav>
      </div>

      {/* Dropdown Menu */}
      {hoveredCategory && (
        <DropdownMenu
          category={hoveredCategory}
          isVisible={hoveredCategory !== null}
          onMouseEnter={() => handleMouseEnter(hoveredCategory)}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default Navbar;
