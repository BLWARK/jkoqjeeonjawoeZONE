"use client";
import React from "react";

const page = () => {
  return (
    <div className="w-full 2xl:max-w-[1200px] xl:max-w-[1200px] lg:max-w-[1020px] mx-auto py-8 px-3 h-full gap-5 2xl:flex xl:flex lg:flex flex-row">
      {/* KIRI */}
      <div className="kiri 2xl:w-[20%] xl:w-[20%] lg:w-[20%] w-full 2xl:h-[550px] xl:h-[550px] lg:h-[550px] h-full 2xl:py-0 xl:py-0 lg:py-0 rounded-lg py-16 flex bg-pink-500  justify-center items-center relative">
        <span className="text-white text-4xl font-bold absolute 2xl:-rotate-90 xl:-rotate-90 lg:-rotate-90 -rotate-0 whitespace-nowrap opacity-50">
          Visi dan Misi
        </span>
      </div>

      {/* KANAN */}
      <div className="kanan 2xl:w-[70%] w-full p-6 space-y-6">
        <section>
          <h2 className="text-4xl font-bold mb-2">Visi</h2>
          <p className="border-l-4 border-pink-500 bg-blue-50 p-4 text-sm leading-relaxed italic">
            Menjadi platform digital terdepan yang menghubungkan Generasi X, Y, dan Z melalui konten kreatif, inspiratif, dan relevan, serta membangun komunitas yang dinamis dalam ekosistem media digital.
          </p>
        </section>

        <section>
          <h2 className="text-4xl font-bold mb-2">Misi</h2>
          <ul className="list-decimal pl-5 border-l-4 border-pink-500 bg-blue-50 p-4 text-sm leading-relaxed italic space-y-4">
            <li>
              Menyediakan konten inovatif dan mengkurasi konten yang segar, inspiratif, dan sesuai dengan tren terkini di kalangan generasi X, Y, dan Z.
            </li>
            <li>
              Membangun komunitas aktif menciptakan ruang interaksi bagi berbagai komunitas digital untuk berbagi ide, kolaborasi, dan berpartisipasi dalam diskusi yang bermakna.
            </li>
            <li>
              Mendukung kreativitas lokal menjadi wadah bagi talenta kreatif lokal untuk mengekspresikan ide dan karya mereka melalui berbagai format media.
            </li>
            <li>
              Memanfaatkan teknologi digital untuk menghadirkan pengalaman yang interaktif dan personal bagi setiap pengguna.
            </li>
            <li>
              Mendorong pertumbuhan ekosistem digital dengan mengembangkan jaringan kemitraan dan kolaborasi dengan brand, kreator konten, dan komunitas guna memperkuat kehadiran di dunia digital.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default page;
