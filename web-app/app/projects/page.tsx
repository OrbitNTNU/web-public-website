import {
  getAllBigProjects,
  getAllSubOrbitalProjects,
} from "@/sanity/fetch/SanityFetch";
import ProjectsOverviewClient from "@/app/projects/ProjectPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Satellite, Slagord!",
  description: "",

  keywords: [
    "selfiesat",
    "framsat",
    "biosat",
    "nextsat",
    "sub-orbital",
    "ORBIT",
  ],

  authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT - WEB",
  publisher: "ORBIT",
  category: "Nonprofit",

  openGraph: {
    title: "Satellite, Slagord!",
    description: "",
    url: "https://orbitntnu.com/sponsors",
    siteName: "ORBITNTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "",
    description: "",
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
export const revalidate = false;
export default async function ProjectsPage() {
  const BigProjects = await getAllBigProjects();
  const SubOrbitalProjects = await getAllSubOrbitalProjects();

  return (
    <ProjectsOverviewClient
      BigProjects={BigProjects ?? []}
      SubOrbitalProjects={SubOrbitalProjects}
    />
  );
}
