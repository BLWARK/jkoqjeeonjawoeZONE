"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi"; // pastikan ini ada di atas
import Link from "next/link";
import regionData from "@/data/regionData";
import DropdownMenu from "@/components/navigation/DropDownMenu";
import { useRouter } from "next/navigation"; // ✅ Gunakan router untuk navigasi
import { useBackContext } from "@/context/BackContext"; // pastikan ini sudah ada
import RegionalDropdown from "../../components/navigation/DropDownRegional";
import Image from "next/image";

const Navbar = () => {
  const {
    searchArticles,
    searchResults,
    platformLogos,
    getAllPlatformLogos,
    getCategoriesByPlatform,
    platformSlugToId,
  } = useBackContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [dropdownTimeout, setDropdownTimeout] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // ✅ State untuk input pencarian
  const [filteredResults, setFilteredResults] = useState([]);
  const [mobileRegionOpen, setMobileRegionOpen] = useState(false);
  const [platformCategories, setPlatformCategories] = useState([]);
  const [platformId, setPlatformId] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [abortController, setAbortController] = useState(null);

  const router = useRouter(); // ✅ Router untuk navigasi
  const pathname = usePathname();

  const isRegionalPage = pathname.startsWith("/regional/");
  const regionSlug = isRegionalPage ? pathname.split("/")[2] : null;

  useEffect(() => {
    const resolvePlatform = async () => {
      if (!regionSlug) {
        setPlatformId(1); // ✅ Default platform nasional
        return;
      }

      const mappedId = platformSlugToId?.[regionSlug];
      if (mappedId) {
        setPlatformId(mappedId);
      } else {
        await getAllPlatformLogos(); // or getAllPlatforms()
      }
    };

    resolvePlatform();
  }, [regionSlug, platformSlugToId]);

  useEffect(() => {
    const fetchCategories = async () => {
      if (!regionSlug || !platformSlugToId?.[regionSlug]) return;

      const platformId = platformSlugToId[regionSlug];
      const categories = await getCategoriesByPlatform(platformId);
      setPlatformCategories(categories); // 🛠️ LANGSUNG ISI ARRAY
    };

    fetchCategories();
  }, [regionSlug, platformSlugToId]);

  const defaultBlack = "/Official.png";
  const defaultWhite = "/Official-white.png";

  const logoSrc = isRegionalPage
    ? platformLogos?.[regionSlug]?.logo_url || defaultBlack
    : defaultBlack;

  const logoWhiteSrc = isRegionalPage
    ? platformLogos?.[regionSlug]?.logo_url || defaultWhite
    : defaultWhite;

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
    const delay = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 600); // ⏱️ delay 500ms setelah user berhenti mengetik

    return () => clearTimeout(delay); // bersihkan timeout
  }, [searchQuery]);

  useEffect(() => {
    if (!debouncedQuery || !platformId) return;

    if (abortController) {
      abortController.abort(); // ❌ Batalkan request sebelumnya
    }

    const controller = new AbortController();
    setAbortController(controller);

    searchArticles(debouncedQuery, platformId, controller.signal);
  }, [debouncedQuery, platformId]);

  useEffect(() => {
    setFilteredResults(searchResults);
  }, [searchResults]);

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
          <a href="/" className="hidden md:block relative w-48 h-20">
            <Image
              src={logoSrc}
              alt="Logo"
              fill
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
            {searchQuery.trim() !== "" && filteredResults.length > 0 && (
              <div className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-120 overflow-y-auto z-50 cursor-pointer">
                {searchResults.slice(0, 6).map((news) => (
                  <div
                    key={news.article_id}
                    onClick={() => handleSelectArticle(news)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-200 transition"
                  >
                    <Image
                      src={news.image || "/default.jpg"}
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
            <a href="/" className="relative w-32 h-10">
              <Image
                src={logoWhiteSrc}
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
                    key={news.article_id}
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
            <button
              onClick={() => setMobileRegionOpen(!mobileRegionOpen)}
              className="flex justify-between items-center w-full text-left text-black hover:underline"
            >
              <span>Regional</span>
              {mobileRegionOpen ? (
                <FiChevronUp className="text-lg" />
              ) : (
                <FiChevronDown className="text-lg" />
              )}
            </button>
            {mobileRegionOpen && (
              <div className="pl-4 space-y-2">
                {regionData.map((region) => (
                  <Link
                    key={region.id}
                    href={region.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-sm text-gray-700 hover:underline"
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            )}

            <a href="/entertaintment" className="block hover:underline">
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
          <div className="2xl:max-w-[1400px] xl:max-w-[1200px] lg:max-w-[1000px] 2xl:flex xl:flex lg:flex flex justify-start items-center space-x-4 py-6 border-b  border-pink-600 border-t-4 overflow-x-auto">
            <div
              className="relative group 2xl:block hidden"
              onMouseEnter={() => handleMouseEnter("regional")}
              onMouseLeave={handleMouseLeave}
            >
              <span className="flex items-center gap-1 text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10 cursor-pointer">
                Regional
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    hoveredCategory === "regional" ? "rotate-180" : ""
                  }`}
                />
              </span>
            </div>

            {isRegionalPage &&
            Array.isArray(platformCategories) &&
            platformCategories.length > 0
              ? platformCategories.map((cat) => (
                  <div
                    key={cat.id}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(cat.category_slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/regional/${regionSlug}/kategori/${cat.category_slug}`}
                      className="text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10 2xl:text-lg xl:text-md lg:text-xs"
                    >
                      {cat.category_name}
                    </Link>
                  </div>
                ))
              : !isRegionalPage
              ? [
                  { name: "Entertainment", path: "/entertaintment" },
                  { name: "Technology", path: "/technology" },
                  { name: "Sport", path: "/sport" },
                  { name: "C-Level", path: "/c-level" },
                  { name: "Lifestyle", path: "/lifestyle" },
                  { name: "Indeks", path: "/indeks" },
                ].map((menu) => (
                  <div
                    key={menu.name}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(menu.category)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={menu.path}
                      className="text-black whitespace-nowrap hover:underline px-4 border-r border-r-gray-300 pr-10 2xl:text-lg xl:text-md lg:text-xs"
                    >
                      {menu.name}
                    </Link>
                  </div>
                ))
              : null}

            <a
              href="https://www.youtube.com/@XYZoneTV"
              target="blank"
              className="hidden md:block relative w-24 h-10"
            >
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
        {/* 🔽 Daftar Regional untuk Mobile (langsung tampil) */}


      </div>
     {(platformId !== null && platformId !== 0) || isRegionalPage ? (
  <div className="bg-gray-700 py-2 border-t border-gray-300 overflow-x-auto mt-4 px-4">
    <div className="flex gap-10 ">
      {regionData.map((region) => (
        <Link
          key={region.id}
          href={region.path}
          className="text-sm text-white hover:underline whitespace-nowrap"
        >
          {region.name}
        </Link>
      ))}
      {/* Spacer di ujung kanan */}
      <div className="min-w-[5px]" />
    </div>
  </div>
) : null}




      {/* Dropdown Menu */}
      {hoveredCategory === "regional" && (
        <RegionalDropdown
          isVisible={true}
          onMouseEnter={() => handleMouseEnter("regional")}
          onMouseLeave={handleMouseLeave}
        />
      )}
    </div>
  );
};

export default Navbar;
