import type { NextConfig } from "next";

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@frontend/coreui"],
};

module.exports = withVanillaExtract(nextConfig);
