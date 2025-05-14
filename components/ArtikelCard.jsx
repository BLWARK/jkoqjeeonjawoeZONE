import React from "react";
import Link from "next/link";
import Image from "next/image";

const ArtikelCard = ({ article }) => {
  const BASE_URL = "http://156.67.217.169:9001";
  const imageSrc = article.image?.startsWith("http")
    ? article.image
    : `${BASE_URL}/${article.image}`;
  const date = new Date(article.date).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/artikel/${article.id}/${article.slug}`}
      className="block border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition bg-white"
    >
      <div className="w-full h-52 relative">
        <Image
          src={imageSrc || "/default.jpg"}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h2 className="text-md font-semibold text-gray-800 line-clamp-2 mb-2">
          {article.title}
        </h2>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
    </Link>
  );
};

export default ArtikelCard;
