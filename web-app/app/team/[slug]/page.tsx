import { notFound } from "next/navigation";
import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";
import { getTeamPage } from "@/sanity/fetch/SanityFetch";
import { Loading } from "@/components/Loading";
import TeamSlugClientPage from "@/app/team/TeamSlugClientPage";
import {getTeamsSlug} from "@/components/TeamsPage/lib/getTeamsSlug";


interface TeamPageProps {
  params: { slug: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
  const { slug } = params;

  const teams = await getTeamsSlug();
  if (!teams) return notFound();

  //  Slugify and match
  const slugify = (name: string) =>
      name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const matchedTeam = teams.find((t: { teamName: string; }) => slugify(t.teamName) === slug);
  if (!matchedTeam) return notFound();

  // Fetch corresponding Sanity page
  const teamDocument = await getTeamPage(matchedTeam.teamID);
  if (!teamDocument) return <Loading />;

  return <TeamSlugClientPage teamDocument={teamDocument} />;
}
