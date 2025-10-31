import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: "https://web-public-website.vercel.app/", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/about", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/projects", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/sponsors", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/contact", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/team", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/articles", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/join", lastModified: new Date() },
        { url: "https://web-public-website.vercel.app/partners", lastModified: new Date() }
    ];
}
