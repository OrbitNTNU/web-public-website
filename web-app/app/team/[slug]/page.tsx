import { Loading } from "@/components/Loading";
import TeamSlugClientPage from "../TeamSlugClientPage";
import {getTeamPage, getTeamPageForMagnus} from "@/sanity/fetch/SanityFetch";

interface TeamPageProps {
  params: { slug: string };
}

export default async function TeamPage(props: TeamPageProps) {
  const { slug } = props.params;
  const teamDocument = await getTeamPageForMagnus();

  if (!teamDocument) {
    return <Loading />;
  }

  const teamId = teamDocument.team;
  console.log("Team ID:", teamId);
  return <TeamSlugClientPage teamDocument={teamDocument} />;
}
