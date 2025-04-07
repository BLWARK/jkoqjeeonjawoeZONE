"use client";
import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import DropdownMenu from "@/components/navigation/DropDownMenu";
import { useRouter } from "next/navigation"; // ✅ Gunakan router untuk navigasi
import newsData from "@/data/news";
import cLevel from "@/data/cLevel";
import headlines from "@/data/headline";
import entertainmentNews from "@/data/entertainmentNews";
import teknologiData from "@/data/teknologiData";
import lifestyleNews from "@/data/lifestyleNews";
import olahraga from "@/data/sportNews";
import Image from "next/image";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ State untuk input pencarian
  const [filteredResults, setFilteredResults] = useState([]);

  const router = useRouter(); // ✅ Router untuk navigasi

  const allNews = [
    ...newsData,
    ...cLevel,
    ...headlines,
    ...entertainmentNews,
    ...teknologiData,
    ...lifestyleNews,
    ...olahraga,
  ];
 // State untuk delay

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

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredResults([]);
      return;
    }

    const results = allNews.filter((news) =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredResults(results);
  }, [searchQuery]);

   // ✅ Fungsi Menangani Pencarian
   const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  const handleSelectArticle = (article) => {
    setSearchQuery("");
    setFilteredResults([]);
    router.push(`/artikel/${article.id}/${article.slug}`);
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

           {/* ✅ Kolom Pencarian */}
           <div className="relative w-full 2xl:max-w-[700px] xl:max-w-[700px] lg:max-w-[550px]  2xl:block xl:block lg:block hidden">
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-4 py-4 shadow-sm"
            >
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-700 px-2"
              />
             
            </form>

            {/* ✅ Hasil Pencarian */}
            {filteredResults.length > 0 && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-120 overflow-y-auto z-50 cursor-pointer">
                {filteredResults.slice(0, 5).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => handleSelectArticle(news)}
                    className="flex items-center gap-3 px-4 py-3  hover:bg-gray-200 cursor-pointer transition"
                  >
                    
                    <Image
                      src={news.image}
                      alt={news.title}
                      width={150}
                      height={50}
                      className="rounded-md"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-800">
                        {news.title}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(news.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

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
          <div className=" flex w-full justify-items-start gap-4">
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

          {/* ✅ Kolom Pencarian */}
         <div className="relative w-full max-w-[200px]  cursor-pointer 2xl:hidden xl:hidden lg:hidden block">
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full bg-white border border-gray-300 rounded-lg px-2 py-2 shadow-sm"
            >
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-gray-700 px-2"
              />
             
            </form>

            {/* ✅ Hasil Pencarian */}
            {filteredResults.length > 0 && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto z-50 cursor-pointer">
                {filteredResults.slice(0, 5).map((news) => (
                  <div
                    key={news.id}
                    onClick={() => handleSelectArticle(news)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 cursor-pointer transition"
                  >
                    {/* <Image
                      src={news.image}
                      alt={news.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    /> */}
                    <div className="flex flex-col border-b border-b-gray-300 pb-3">
                      <span className="text-xs font-medium text-gray-800">
                        {news.title}
                      </span>
                      {/* <span className="text-xs text-gray-500">
                        {new Date(news.date).toLocaleDateString()}
                      </span> */}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

         

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-gray-100 p-4 space-y-4">
            <a href="/" className="block hover:underline">
              Home
            </a>
            <a href="/entertainment" className="block hover:underline">
              Entertainment
            </a>
            <a href="/technology" className="block hover:underline">
              Technology
            </a>
            <a href="/sport" className="block hover:underline">
              Sport
            </a>
            <a href="/c-level" className="block hover:underline">
              C-level
            </a>
            <a href="/lifestyle" className="block hover:underline">
              Lifestyle
            </a>
            <a href="/indeks" className="block hover:underline">
              Indeks
            </a>
            
          </nav>
        )}

        {/* Menu Navigation */}
        <nav className="bg-gray-100 w-full mt-2 relative  ">
          <div className="2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1000px] flex justify-start items-center space-x-4 py-6 border-b  border-pink-600 border-t-4 overflow-x-auto">
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
              { name: "Indeks", path: "/indeks",  },
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

