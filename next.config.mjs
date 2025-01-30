import createMDX from '@next/mdx'
/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_BASE_BACKEND_URL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
        NEXT_PUBLIC_INTERNAL_BACKEND_URL: process.env.NEXT_PUBLIC_INTERNAL_BACKEND_URL,
    },
    output: 'standalone',
    pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
    experimental: {
        mdxRs: true,
    }
};

const withMDX = createMDX({
    // Add markdown plugins here, as desired
  })

export default withMDX(nextConfig);  