import createNextIntlPlugin from "next-intl/plugin";
import path from "path";

const withNextIntl = createNextIntlPlugin("./src/app/i18n.ts");
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        minimumCacheTTL: 60,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "upload.wikimedia.org",
            },
            {
                protocol: "https",
                hostname: "ikonect.info",
            },
            {
                protocol: "http",
                hostname: "ikonect.info",
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(process.cwd(), "src");
        return config;
    },
};

export default withNextIntl(nextConfig);
