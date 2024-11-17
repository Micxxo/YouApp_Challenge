/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
//   disable: process.env.NODE_ENV === "development",

module.exports = withPWA({
  reactStrictMode: false,
  env: {
    SECRET: process.env.SECRET,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
