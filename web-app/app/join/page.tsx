import { Loading } from "@/components/General/Layout/Loading";
import { getJoinPage } from "@/sanity/fetch/SanityFetch";
import JoinClientPage from "./JoinClientPage";
import { getTeamsData } from "@/lib/getTeamsData";
import { Team } from "@/lib/getTeamsSlug";
import { toSlug } from "@/lib/teams";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Selfiesat | Framsat | Framsat 1.5 | Biosat",
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
    title: "",
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

export default async function JoinPage() {
  const join = await getJoinPage();

  if (!join) {
    return <Loading />;
  }

  const teams = (await getTeamsData()) as Team[];
  if (!teams) {
    console.error("No team data from Orbit API");
    return <Loading />;
  }

  const allTeamsWithPositions = teams.filter((position) =>
    join.components.some((team) => Number(team.team) === position.teamID),
  );

  const teamInfo = allTeamsWithPositions.map((team) => ({
    name: team.teamName,
    teamID: team.teamID,
    group: team.group,
    slug: toSlug(team.teamName),
  }));

  return <JoinClientPage joinPage={join} teamInfo={teamInfo} />;
}
