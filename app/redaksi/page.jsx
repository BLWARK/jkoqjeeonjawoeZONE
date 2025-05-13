"use client";
import React from "react";

const page = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-gray-800 space-y-8">
      {/* ABOUT US */}
      <section>
        <h2 className="text-xl font-bold text-blue-700 mb-4">ABOUT US</h2>
        <div className="border-l-4 border-blue-500 bg-blue-50 p-4 text-sm leading-relaxed italic">
          Yo, XYZiest! Di xyzone.media, kita emang bikin kekinian banget! Kita punya empat kategori berita terpadu: News, Technology, Sports, dan Lifestyle. Nah, yang beda, di bagian News, kita punya dua subkategori yang bikin greget: ada Xyzone News buat berita yang keren banget gayanya, dan ada juga media berita lokal LBJ Jakarta, LBJ Makassar, serta LBJ Sukabumi buat liputan berita nasional yang terdesain dan terfokus.

          <br /><br />
          Kita di xyzone.media janji banget buat kasih info terpadu dan terpercaya buat kalian semua, guys. Sebagai platform berita online yang super up-to-date, kita menawarkan konten-konten seru dan relevan buat kalian.
          <br /><br />
          Visi kita jadi sumber berita yang beneran fresh dan terpercaya, XYZiest! Tim kita selalu jaga kualitas tinggi setiap artikel dan berita yang kita sajikan.
          <br /><br />
          Oh iya, yang bikin kita beda, XYZiest, di sinilah inovasi media digital berpadu! Bagian utama dari XYZONE media yang mampu membangun relevansi dan kredibilitas.
          <br /><br />
          Makasih banget udah milih XYZonemedia.com buat sumber informasi kalian, guys! Kita berkomitmen memberikan informasi yang bermanfaat dan bikin kalian puas banget, XYZiest!
        </div>
      </section>

      {/* SUSUNAN REDAKSI */}
      <section>
        <h2 className="text-xl font-bold text-blue-700 mb-4">SUSUNAN REDAKSI</h2>
        <div className="border border-gray-300 rounded-lg p-4 bg-white">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-blue-100 p-2 font-semibold">Pemimpin Umum</div>
            <div className="bg-blue-50 p-2">Jimmy Lizardo</div>

            <div className="bg-blue-100 p-2 font-semibold">Pemimpin Perusahaan</div>
            <div className="bg-blue-50 p-2">Ricky Nehemia Adam</div>

            <div className="bg-blue-100 p-2 font-semibold">Wakil Pemimpin Perusahaan</div>
            <div className="bg-blue-50 p-2">Anupam Dubey</div>

            <div className="bg-blue-100 p-2 font-semibold">Penanggung Jawab Redaksi</div>
            <div className="bg-blue-50 p-2">Cecep Mahmud</div>

            <div className="bg-blue-100 p-2 font-semibold">Pemimpin Redaksi</div>
            <div className="bg-blue-50 p-2">Cecep Mahmud</div>

            <div className="bg-blue-100 p-2 font-semibold">Wakil Pemimpin Redaksi</div>
            <div className="bg-blue-50 p-2">Shandi March Dede Titin</div>

            <div className="bg-blue-100 p-2 font-semibold">Sekretaris Redaksi</div>
            <div className="bg-blue-50 p-2">Rizka Kurnia</div>

            <div className="bg-blue-100 p-2 font-semibold">Penulis</div>
            <div className="bg-blue-50 p-2 space-y-1">
              <p>Priyo Husada</p>
              <p>Abdul Hadi</p>
              <p>Deblot Iwan</p>
              <p>Andana Eiky</p>
              <p>Siti Ayani</p>
            </div>

            <div className="bg-blue-100 p-2 font-semibold">IT Developer</div>
            <div className="bg-blue-50 p-2 space-y-1">
              <p>Rhonald Bastian</p>
            </div>

            <div className="bg-blue-100 p-2 font-semibold">Sales</div>
            <div className="bg-blue-50 p-2">Kristel Lovitasari</div>

            <div className="bg-blue-100 p-2 font-semibold">Alamat Redaksi</div>
            <div className="bg-blue-50 p-2">
              PT. Bisnis Ekosistem Kreatif Indonesia<br />
              Wisma Aria Lantai 4 Ruang 401<br />
              Jl. HOS. Cokroaminoto No. 81, Menteng<br />
              Jakarta Pusat | 10310
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
