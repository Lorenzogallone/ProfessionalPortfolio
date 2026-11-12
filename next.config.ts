import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    // Old project URLs from the previous version of the site.
    return [
      { source: "/projects/fantaf1", destination: "/work/fanta-f1", permanent: true },
      { source: "/projects/tiger", destination: "/work/tiger", permanent: true },
      { source: "/projects/:slug", destination: "/#work", permanent: true },
    ];
  },
};

export default nextConfig;
