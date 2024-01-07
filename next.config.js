/** @type {import('next').NextConfig} */
const NextConfig = {
  experimental: {
    appDir: true,
  },
  
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.themoviedb.org',
        port: '3001',
        pathname: '/components/MovieCard.tsx',
      },
    ],
  },
}

module.exports = NextConfig


