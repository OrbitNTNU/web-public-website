import { Team } from "@/app/team/TeamsClientPage";
import { Loading } from "@/components/General/Layout/Loading";
import StarsView from "../StarsViewClientPage";
import { getStaticTeamsData } from "@/lib/getTeamsData";

export default async function StarsPage() {
  const teamsData: Team[] = await getStaticTeamsData();

  if (!teamsData) {
    return <Loading />;
  }

  return <StarsView teamsData={teamsData} />;
}
