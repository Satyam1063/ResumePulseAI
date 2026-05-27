// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tells Next.js not to bundle native dependencies
  serverExternalPackages: ["pdf-parse", "@napi-rs/canvas"], 
};

export default nextConfig;
