const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.xyzone.media",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig; // ← ini penting, jangan pakai `export default` kalau pakai JavaScript biasa
