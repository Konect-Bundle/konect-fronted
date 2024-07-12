import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: "/kuser/",
        },
        sitemap: "https://ikonect.me/sitemap.xml",
    };
}
