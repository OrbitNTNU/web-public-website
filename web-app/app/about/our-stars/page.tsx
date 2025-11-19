import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";
import { Team } from "@/app/team/TeamsClientPage";
import { Loading } from "@/components/General/Layout/Loading";
import StarsView from "../StarsViewClientPage";

export default async function StarsPage() {
  const teamsData: Team[] = await getTeamsData();

  if (!teamsData) {
    return <Loading />;
  }

  return <StarsView teamsData={teamsData} />;
}
