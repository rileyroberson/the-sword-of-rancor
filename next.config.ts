import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGitHubPages ? "/the-sword-of-rancor" : "",
  assetPrefix: isGitHubPages ? "/the-sword-of-rancor/" : "",
};

export default nextConfig;
