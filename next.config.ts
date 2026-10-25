import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // 404 para URLs fuera de [locale] (no hay un layout raíz común que la envuelva).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// El plugin de next-intl encuentra src/i18n/request.ts y lo conecta a Next.
const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
