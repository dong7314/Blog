import type { NextConfig } from "next";

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@frontend/coreui"],
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    workerThreads: false,
    cpus: 2,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fastly.picsum.photos",
      },
      {
        protocol: "https",
        hostname: "api-minio.ldy-studio.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  staticPageGenerationTimeout: 200,
};

module.exports = withVanillaExtract(nextConfig);
