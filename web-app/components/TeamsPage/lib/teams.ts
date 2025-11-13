import { fetchTeamSlug } from "@/sanity/fetch/SanityFetch";

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

export const getSlug = async (teamID: number): Promise<string> => {
  return "web";
};
