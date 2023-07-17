/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    dirs: [
      "src/components",
      "src/configs",
      "src/constants",
      "src/containers",
      "src/hooks",
      "src/layouts",
      "src/models",
      "src/pages",
      "src/recoils",
      "src/utils",
    ],
  },
  experimental: {
    scrollRestoration: true,
    outputStandalone: true,
  },
  images: {
    domains: ["cms.dev.ftech.ai", "cms.ftech.ai"],
  },
  i18n: {
    locales: ["vi", "en"],
    defaultLocale: "vi",
    localeDetection: false,
  },
};

module.exports = nextConfig;
