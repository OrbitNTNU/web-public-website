import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://orbitntnu.com/", lastModified: new Date() },
    {
      url: "https://orbitntnu.com/about",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/projects",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/sponsors",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/contact",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/team",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/articles",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/join",
      lastModified: new Date(),
    },
    {
      url: "https://orbitntnu.com/partners",
      lastModified: new Date(),
    },
  ];
}
