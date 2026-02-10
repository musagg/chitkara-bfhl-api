/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {},
  env: {
    OFFICIAL_EMAIL: process.env.OFFICIAL_EMAIL,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
}

module.exports = nextConfig
