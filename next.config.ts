import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Phosphor barrel re-exports thousands of icons; tree-shake per-import.
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react"],
  },
};

export default nextConfig;
