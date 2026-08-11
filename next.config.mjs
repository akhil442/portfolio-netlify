/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // The react-hooks/exhaustive-deps warning in ScrollyCanvas is pre-existing and harmless
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
