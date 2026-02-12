import {
  getAllBigProjects,
  getAllSubOrbitalProjects,
  getLandingPage,
  getProjectsPage,
} from "@/sanity/fetch/SanityFetch";
import ProjectsOverviewClient from "@/app/projects/ProjectClientPage";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Satellite!",
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
    title: "Satellite!",
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

  },
  alternates: {
    canonical: "https://orbitntnu.com/sponsors",
    languages: {
      "en-US": "https://orbitntnu.com/sponsors",
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
};
export const revalidate = 5;

export default async function ProjectsPage() {
  const data = await getProjectsPage();
  
  return (
    <ProjectsOverviewClient
      sections={data?.sections ?? []}
    />
  );
}
