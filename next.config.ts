import type { NextConfig } from 'next';
import { legacyRedirects } from './src/lib/technical/redirects';

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
