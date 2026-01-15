import { Loading } from "@/components/General/Layout/Loading";
import TeamSlugClientPage from "../TeamSlugClientPage";
import { getTeamPage } from "@/sanity/fetch/SanityFetch";
import { getTeamsData } from "@/lib/getTeamsData";
import { Team } from "../TeamsClientPage";
import { toSlug } from "@/lib/teams";

interface TeamPageProps {
  params: { slug: string };
}
export const dynamic = "force-dynamic";

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = await params;

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

  return <TeamSlugClientPage teamDocument={teamDocument} team={matchedTeam} />;
}
