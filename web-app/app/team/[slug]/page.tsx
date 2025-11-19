import { Loading } from "@/components/General/Layout/Loading";
import TeamSlugClientPage from "../TeamSlugClientPage";
import { getTeamPage } from "@/sanity/fetch/SanityFetch";
import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";
import { Team } from "../TeamsClientPage";

interface TeamPageProps {
  params: { slug: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = params;

  const toSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const teams = (await getTeamsData()) as Team[];
  if (!teams) {
    console.error("No team data from Orbit API");
    return <Loading />;
  }

  const matchedTeam = teams.find(
    (team) => toSlug(team.teamName) === slug.toLowerCase(),
  );

  if (!matchedTeam) {
    console.error(`No team found for slug: ${slug}`);
    return <Loading />;
  }

  const teamDocument = await getTeamPage(matchedTeam.teamID);

  if (!teamDocument) {
    console.error(`No Sanity page found for teamID ${matchedTeam.teamID}`);
    return <Loading />;
  }

  console.log("Resolved:", matchedTeam.teamName, "teamID:", matchedTeam.teamID);

  return <TeamSlugClientPage teamDocument={teamDocument} team={matchedTeam} />;
}
