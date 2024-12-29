/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Mock Node.js modules that are not available in the browser
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false, // Mock 'fs' for compatibility
        encoding: false, // Avoid errors with 'encoding'
      };
      return config;
    },
    env: {
      NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || 'production', // Example for environment setup
    },
  };
  
  export default nextConfig;
  