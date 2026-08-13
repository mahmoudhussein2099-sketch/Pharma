/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
    ]
  },
}

module.exports = nextConfig