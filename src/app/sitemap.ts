import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://www.ikonect.me";
    var sitemap: MetadataRoute.Sitemap = [];

    const staticPages = [
        "",
        "login",
        "register",
        "password-email",
        "contact",
        "howit",
    ];

    const dynamicPages = ["products", "product-item", "password-reset"];

    const allPages = [...staticPages, ...dynamicPages];
    allPages.map((page) => {
        sitemap.push({
            url: `${baseUrl}/${page}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: page === "" ? 1.0 : 0.8,
        });
    });
    return sitemap;
}
