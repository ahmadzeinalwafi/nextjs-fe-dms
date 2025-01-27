/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_BACKEND_URL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
        NEXT_PUBLIC_INTERNAL_BACKEND_URL: process.env.NEXT_PUBLIC_INTERNAL_BACKEND_URL,
    },
    output: 'standalone'
};

export default nextConfig;  