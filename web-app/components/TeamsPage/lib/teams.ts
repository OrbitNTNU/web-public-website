import { fetchTeamSlug } from "@/sanity/queries/teams";

export interface Member {
  name: string;
  title: string;
  mail?: string;
  phoneNumber?: string;
  linkedin?: string;
  showPhoneNrOnWebsite: boolean;
  privilege: string;
  image?: string;
}

export interface Team {
  teamID: number;
  group: string;
  description: string;
  teamName: string;
  members: Member[];
}

export const groupColors: Record<string, string> = {
  IT: "color-orange-sherbert",
  TECHNICAL: "color-emerald-fizz",
  ADMINISTRATIVE: "color-sky-mint",
  MENTORS: "color-laser-lemon",
  DAILY_OPERATIONS: "color-pink-blast",
  FINANCIAL: "color-yellow-400",
  MARKETING_AND_EVENT: "color-purple-400",
  SUPPORT: "color-blue-400",
  default: "color-emerald-fizz",
};

// Safe for server or client
export const getSlug = async (teamID: number): Promise<string> => {
  const data = await fetchTeamSlug(teamID);
  return data?.slug?.current || "";
};
