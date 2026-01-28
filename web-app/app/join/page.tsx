import { Loading } from "@/components/General/Layout/Loading";
import { getJoinPage } from "@/sanity/fetch/SanityFetch";
import JoinClientPage from "./JoinClientPage";
import { getTeamsData } from "@/lib/getTeamsData";
import { Team } from "@/lib/getTeamsSlug";
import { toSlug } from "@/lib/teams";

const data = {
  title: "Join Us!",
  text: "Become a part of ORBIT and embark on an exciting journey in satellite technology. Whether you're a student eager to learn or a professional looking to contribute, we welcome you to join our team. Explore our open positions and find out how you can make a difference with ORBIT.",
};
export const revalidate = 60;

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
