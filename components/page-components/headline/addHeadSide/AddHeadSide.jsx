import Image from "next/image";
import Link from "next/link";
import headline from "@/data/headline"; // Import headline data
import users from "@/data/users"; // Import users data
import { getCategoryColor } from "@/data/categoryColors"; // Import kategori warna

// Fungsi mendapatkan author berdasarkan ID
const getAuthorById = (authorId) => users.find((user) => user.id === authorId);

const AddHeadSide = () => {
  const sideHeadlines = headline.slice(1, 3); // Ambil berita tambahan untuk sidebar

  return (
    <div className="grid grid-cols-1 2xl:gap-6 gap-4">
      {sideHeadlines.map((headline) => {
        const author = getAuthorById(headline.authorId); // Ambil satu author

        return (
          <div
            key={headline.id}
            className="2xl:w-[390px] 2xl:h-[238px] w-full h-[200px] relative"
          >
            {/* Gambar Artikel */}
            <Image
              src={headline.image}
              alt={headline.title}
              className="rounded-lg"
              fill
              style={{ objectFit: "cover" }}
            />

            {/* Overlay Konten */}
            <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg p-4 flex flex-col justify-end">
              <Link href={`/artikel/${headline.id}/${headline.slug}`} passHref>
                <h3 className="text-white text-md font-bold leading-tight mt-1 hover:underline cursor-pointer">
                  {headline.title}
                </h3>
              </Link>

              {/* Author & Date */}
              <div className="mt-2 flex items-center space-x-2 text-sm text-gray-300">
                {author && (
                  <div className="flex items-center space-x-2 2xl:text-xs text-[0.9em]">
                    <Image
                      src={author.photo}
                      alt={author.name}
                      width={20}
                      height={20}
                      className="rounded-full"
                    />
                    <span className="border-r border-gray-300 pr-2">
                      {author.name}
                    </span>
                  </div>
                )}
                <span>{headline.date}</span>
              </div>
            </div>

            {/* Kategori */}
            <span
              className={`absolute top-3 left-3 text-white px-4 py-1 rounded-lg text-xs font-semibold ${getCategoryColor(
                headline.category[0]
              )}`}
            >
              {headline.category[0]}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AddHeadSide;
