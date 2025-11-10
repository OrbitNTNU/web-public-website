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

// Safe for server or client
export const getSlug = async (teamID: number): Promise<string> => {
  const data = await fetchTeamSlug(teamID);
  return data?.slug?.current || "";
};
