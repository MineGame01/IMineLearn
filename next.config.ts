import type { NextConfig } from 'next';
import AnalyzerInit from '@next/bundle-analyzer';

export default () => {
  const nextConfig: NextConfig = {
    experimental: {
      turbo: {
        treeShaking: false,
      },
    },
  };
  const withBundleAnalyzer = AnalyzerInit({
    enabled: process.env.ANALYZE === 'true',
  });
  return withBundleAnalyzer(nextConfig);
};
