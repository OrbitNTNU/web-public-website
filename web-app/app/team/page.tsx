import TeamsClientPage from "@/app/team/TeamsClientPage";
import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";
import { Loading } from "@/components/Loading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "This is us!",
  description: "",

  keywords: [
    "Electronics",
    "Web",
    "Dev-ops",
    "Systems Engineering",
    "Satelite Software",
    "Project Management",
    "ORBIT",
  ],

  authors: [{ name: "ORBITNTNU", url: "https://orbitntnu.com" }],
  creator: "ORBIT - WEB",
  publisher: "ORBIT",
  category: "Nonprofit",

  openGraph: {
    title: "This is us!",
    description: "",
    url: "https://orbitntnu.com/",
    siteName: "ORBIT NTNU",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://web-public-website.vercel.app/orbitluv.png",
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
    canonical: "https://orbitntnu.com/team",
    languages: {
      "en-US": "https://orbitntnu.com/team",
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
export const revalidate = 300; //5 minutter

export default async function TeamsPage() {
  const teamsData = await getTeamsData();
  if (!teamsData) {
    return <Loading />;
  }

  return <TeamsClientPage initialTeamsData={teamsData} />;
}
