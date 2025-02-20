const categoryColors = {
    teknologi: "bg-green-500",
    hiburan: "bg-blue-500",
    berita: "bg-red-500",
    olahraga: "bg-yellow-500",
    lifestyle: "bg-pink-500",
    crypto: "bg-purple-500",
    business: "bg-orange-500",
    default: "bg-gray-500", // Default jika kategori tidak ditemukan
  };
  
  // Fungsi untuk mendapatkan warna kategori berdasarkan nama kategori
  export const getCategoryColor = (category) => {
    return category ? categoryColors[category.toLowerCase()] || categoryColors.default : categoryColors.default;
  };
  
  
  export default categoryColors;
  