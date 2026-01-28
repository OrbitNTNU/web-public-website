import LandingPage from "@/app/LandingClientPage";
import { getTeamsData } from "@/lib/getTeamsData";
import { getSlug } from "@/lib/teams";
import { getLandingPage } from "@/sanity/fetch/SanityFetch";
import type { Metadata } from "next";

export const revalidate = false;
export const metadata: Metadata = {
  title: "Your Space Journey Starts Here!",
  description: "",

  keywords: [
    "ORBIT NTNU",
    "NTNU",
    "Cubesat",
    "Selfiesat",
    "Student",
    "Verv",
    "ORBIT",
  ],

  authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT - WEB",
  publisher: "ORBIT",
  category: "Nonprofit",

  openGraph: {
    title: "Your Space Journey Starts Here",
    description: "",
    url: "https://orbitntnu.com/",
    siteName: "ORBIT NTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://orbitntnu.com/1.jpg",
        width: 1200,
        height: 630,
        alt: "This is ORBIT",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "ORBIT NTNU",
    description: "",
    creator: "@ORBITNTNU",
    site: "@ORBITNTNU",
    images: ["https://orbitntnu.com/orbitbig.jpg"],
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

export default async function Home() {
  const data = await getLandingPage();
  const teams = await getTeamsData();

  const teamsWithSlugs = await Promise.all(teams.map(async (team: { teamID: number; }) => ({
    ...team,
    slug: await getSlug(team.teamID), 
  })));

  const sortedTeams = teamsWithSlugs.sort((a, b) => a.teamName.localeCompare(b.teamName));

  return <LandingPage sections={data?.sections ?? []} teams={sortedTeams ?? []} />;
}
