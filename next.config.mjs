/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.pixabay.com",
                pathname: "/photo/**",
            },
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "/**", // Allowing all paths from this hostname
            }
        ]
    }
};

export default nextConfig;
