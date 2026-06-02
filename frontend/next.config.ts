import type { NextConfig } from "next";
import path from "node:path";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  turbopack: {
    // Repo root, so Turbopack can resolve the @shadow-ai/core workspace package.
    root: path.resolve(__dirname, ".."),
  },
  // @shadow-ai/core ships TypeScript source (workspace package); Next must transpile it.
  transpilePackages: ["@shadow-ai/core"],
};

export default withNextIntl(nextConfig);
