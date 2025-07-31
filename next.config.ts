import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    serverExternalPackages: ["alith"],
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // Exclude alith from client-side bundling
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                crypto: false,
            };
        }
        return config;
    },
};

export default nextConfig;
