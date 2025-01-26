/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BASE_BACKEND_URL: process.env.BASE_BACKEND_URL,
    },
};

export default nextConfig;  