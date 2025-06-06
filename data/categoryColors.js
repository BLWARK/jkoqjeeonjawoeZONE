const categoryColors = {
  TECHNOLOGY: "bg-green-500",
  ENTERTAINTMENT: "bg-blue-500",
  Berita: "bg-red-500",
  SPORT: "bg-yellow-500",
  LIFESTYLE: "bg-pink-500",
  crypto: "bg-purple-500",
  business: "bg-orange-500",
  "C-LEVEL": "bg-purple-500", // Gunakan string agar mendukung karakter "-"
  Wisata: "bg-green-500",
  Kuliner: "bg-orange-500",
  Budaya: "bg-pink-500",
  Hukrim: "bg-red-500",
  DEFAULT: "bg-gray-500",
};

// Fungsi untuk mendapatkan warna kategori
export const getCategoryColor = (category) => {
  return categoryColors[category] || categoryColors.DEFAULT;
};

export default categoryColors;
