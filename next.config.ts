import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        // Paréntesis escapados: en path-to-regexp () son grupos
        source: '/marcas/haval/ora-3-\\(good-cat\\)',
        destination: '/marcas/haval/ora-3-good-cat',
        permanent: true,
      },
      {
        source: '/test-catalog',
        destination: '/catalogo',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
