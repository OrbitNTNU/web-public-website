import { getTeamsSlug } from "@/components/TeamsPage/lib/getTeamsSlug";

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

const toSlug = (name: string) =>
    name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const getSlug = async (teamID: number): Promise<string> => {
  try {
    const teams = await getTeamsSlug();

    if (!teams || teams.length === 0) {
      console.error("No team data found when generating slug");
      return "unknown-team";
    }

    const team = teams.find((t) => t.teamID === teamID);

    if (!team) {
      console.error(`No matching team found for ID: ${teamID}`);
      return "unknown-team";
    }

    return toSlug(team.teamName);
  } catch (error) {
    console.error("Failed to fetch slug for team:", error);
    return "unknown-team";
  }
};
