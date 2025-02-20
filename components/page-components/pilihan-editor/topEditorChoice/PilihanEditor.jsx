import React from "react";
import Image from "next/image";
import Link from "next/link";
import PilihanEditor from "@/data/EditorChoice";
import users from "@/data/users";
import AddEditorBottom from "@/components/page-components/pilihan-editor/addBottomEditor/AddBottomEditor";
import SocialMedia from "@/components/page-components/socialMedia/SocialMedia";
import Adv from "@/components/page-components/adv-sect/AdvEditor";
import { getCategoryColor } from "@/data/categoryColors"; // Import fungsi warna kategori

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId) || {};

// Fungsi untuk memotong judul menjadi maksimal 10 kata
const sliceTitle = (title, maxWords = 10) => {
  const words = title.split(" ");
  return words.length > maxWords ? words.slice(0, maxWords).join(" ") + "..." : title;
};

const PilihanEditorComponent = () => {
  const mainArticle = PilihanEditor[0]; // Artikel utama

  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8">
      <h2 className="text-3xl font-bold text-pink-500 flex items-center mb-3">
        Pilihan Editor
      </h2>
      <div className="w-[10%] h-[6px] rounded-full bg-pink-500 mb-10"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section - Main Article */}
        <div className="lg:col-span-2">
          <div className="flex flex-col-reverse lg:flex-row justify-center items-center gap-6">
            {/* Artikel Utama - Teks */}
            <div className="lg:w-[50%] w-full flex flex-col">
              {/* Kategori */}
              {mainArticle.category && (
                <span
                  className={`px-3 py-1 text-xs font-semibold text-white rounded max-w-max ${getCategoryColor(mainArticle.category[0])}`}
                >
                  {mainArticle.category[0]}
                </span>
              )}

              {/* Judul */}
              <Link href={`/artikel/${mainArticle.id}/${mainArticle.slug}`} passHref>
                <h3 className="text-3xl font-bold hover:underline cursor-pointer mt-2">
                  {sliceTitle(mainArticle.title)}
                </h3>
              </Link>

              <p className="text-gray-500 mt-2 text-sm">{mainArticle.description}</p>

              <div className="flex items-center mt-4 text-sm text-gray-500">
                {mainArticle.authorIds.map((authorId) => {
                  const author = getAuthorById(authorId);
                  return (
                    <div key={authorId} className="flex items-center space-x-2">
                      <Image
                        src={author.photo}
                        alt={author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span>{author.name}</span>
                    </div>
                  );
                })}
                {/* Garis pemisah */}
                <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
                <span>{mainArticle.date}</span>
              </div>
            </div>

            {/* Artikel Utama - Gambar */}
            <div className="relative w-full lg:w-[50%] h-[250px] lg:h-[300px]">
              <Image
                src={mainArticle.image}
                alt={mainArticle.title}
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Additional Articles Below */}
          <AddEditorBottom />
        </div>

        {/* Right Section - Ads & Social Media */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Ads Section */}
          <Adv />

          {/* Social Media Followers */}
          <SocialMedia />
        </div>
      </div>
    </div>
  );
};

export default PilihanEditorComponent;
