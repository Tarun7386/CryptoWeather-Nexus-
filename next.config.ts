/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'openweathermap.org', // For weather icons
      'assets.coingecko.com', // For crypto icons
      'newsdata.io' ,// For news thumbnails
      'coin-images.coingecko.com',
    ],
  },
  // Optional: Enable SWC minification for better performance
  swcMinify: true,
};

module.exports = nextConfig;
