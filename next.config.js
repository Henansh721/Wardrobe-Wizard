/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  css: ["styles/global.css"],
  plugins: [require("tailwindcss")],
  images: {
    domains: [
      "icons8.com",
      "cdn.sanity.io",
      "lh3.googleusercontent.com",
      "storage.googleapis.com",
      "images.staybook.in",
      "firebasestorage.googleapis.com",
      "rukminim2.flixcart.com",
    ],
    loader: "default",
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
