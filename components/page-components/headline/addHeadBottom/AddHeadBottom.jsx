import React from 'react'
import Image from "next/image";
import Link from "next/link";
import headline from "@/data/headline"; // Pastikan path sesuai
import users from "@/data/users"; // Pastikan path sesuai
import { getCategoryColor } from "@/data/categoryColors";



const getAuthorById = (authorId) => users.find((user) => user.id === authorId);
const AddHeadBottom = () => {

    const additionalHeadlines = headline.slice(3, 5); // Tambahan berita di bawah headline
  return (
    <>
    {/* Tambahan berita di bawah headline */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
    {additionalHeadlines.map((headline) => (
      <div
        key={headline.id}
        className="flex  items-center bg-white shadow-sm  rounded-lg overflow-hidden"
      >
        <div className="relative   w-full  2xl:h-[200px] h-32  ">
          <Image
            src={headline.image}
            alt={headline.title}
            fill
            className="object-cover p-4 "
          />
        </div>
        <div className="p-4">
          <span
            className={`inline-block mb-2 px-3 py-1 text-xs font-semibold text-white rounded-lg ${getCategoryColor(
              headline.category[0]
            )}`}
          >
            {headline.category[0]}
          </span>
          <Link href={`/artikel/${headline.id}/${headline.slug}`} passHref>
            <h3 className="text-black 2xl:text-lg text-[14px] font-semibold hover:underline cursor-pointer">
              {headline.title}
            </h3>
          </Link>
          <div className="mt-2  2xl:flex 2xl:justify-start items-center text-sm text-gray-500  hidden">
            {headline.authorIds.map((authorId) => {
              const author = getAuthorById(authorId);
              return (
                <div key={authorId} className="flex items-center ">
                  <Image
                    src={author.photo}
                    alt={author.name}
                    width={20}
                    height={20}
                    className="rounded-full"
                  />
                  <span className="p-2 2xl:text-xs text-[0.9em] whitespace-nowrap">
                    {author.name}
                  </span>
                </div>
              );
            })}
            {/* Garis pemisah */}
            <div className="w-[1px] h-5 bg-gray-300 mx-2"></div>
            <span className=" px-2 2xl:text-xs text-[0.9em]">
              {headline.date}
            </span>
          </div>
        </div>
      </div>
    ))}
  </div>
  </>
  )
}

export default AddHeadBottom