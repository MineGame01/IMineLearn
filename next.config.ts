import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD, PHASE_PRODUCTION_SERVER } from 'next/constants';
import AnalyzerInit from '@next/bundle-analyzer';

export default (phase) => {
  const nextConfig: NextConfig = {
    env: {
      APP_MODE:
        phase === PHASE_PRODUCTION_BUILD || phase === PHASE_PRODUCTION_SERVER ? 'prod' : 'dev',
    },
  };
  const withBundleAnalyzer = AnalyzerInit({
    enabled: process.env.ANALYZE === 'true',
  });
  return withBundleAnalyzer(nextConfig);
};
