/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    // Pre-existing lint warnings in unrelated scaffold files should not block builds.
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['localhost'],
    unoptimized: true
  },
  // Handle client-side routing
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:5000/api/:path*'
      },
      // Handle all client-side routes
      {
        source: '/:path*',
        destination: '/',
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'text/html'
          }
        ]
      }
    ]
  },
  // Ensure Next.js serves static files from public directory
  distDir: 'build',
  // Preserve React's proxy setting
  serverRuntimeConfig: {
    API_URL: 'http://localhost:5000'
  },
  publicRuntimeConfig: {
    API_URL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:5000'
  }
}

module.exports = nextConfig