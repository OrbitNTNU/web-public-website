import { getSponsorPage } from "@/sanity/fetch/SanityFetch";
import SponsorClientPage from "./SponsorClientPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Heartfelt Thanks to Our Sponsors",
    description:
        "A heartfelt thank you to all our incredible sponsors for their generous support and partnership in helping us achieve our mission.",

    keywords: [
        "sponsors",
        "partners",
        "supporters",
        "KSAT",
        "Kongsberg",
        "ORBIT",
    ],

    authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
    creator: "ORBIT - WEB",
    publisher: "ORBIT",
    category: "Nonprofit",

    openGraph: {
        title: "Heartfelt Thanks to Our Sponsors",
        description:
            "Meet the sponsors and partners who make our mission possible through their generous support.",
        url: "https://orbitntnu.com/sponsors",
        siteName: "ORBITNTNU",
        locale: "en_US",
        type: "website",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Heartfelt Thanks to Our Sponsors",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Heartfelt Thanks to Our Sponsors",
        description:
            "Discover our amazing sponsors who make our mission possible. We're deeply grateful for their support.",
        creator: "@YourTwitterHandle",
        site: "@YourTwitterHandle",
        images: ["https://yoursite.com/og/sponsors-og-image.jpg"],
    },
    alternates: {
        canonical: "https://yoursite.com/sponsors",
        languages: {
            "en-US": "https://yoursite.com/sponsors",
        },
    },

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default async function SponsorPage() {

  const sponsors = await getSponsorPage();
  if (!sponsors) {
    return (
      <div>
        <h1>404: Sponsors page not found</h1>
      </div>
    );
  }

  return <SponsorClientPage sponsorsPage={sponsors} />;
}
