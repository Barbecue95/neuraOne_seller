import type { NextConfig } from "next";
import { codeInspectorPlugin } from "code-inspector-plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) config.plugins.push(codeInspectorPlugin({ bundler: "webpack" }));
    return config;
  },
};

export default nextConfig;
