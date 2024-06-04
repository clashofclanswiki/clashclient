/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks']
  },
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CLIENT_DOMAIN: process.env.CLIENT_DOMAIN
  }
}

export default nextConfig
