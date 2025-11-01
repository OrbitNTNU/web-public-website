import TeamsClientPage from "@/app/team/TeamsClientPage";
import {getTeamsData} from "@/components/TeamsPage/lib/getTeamsData";
import {Loading} from "@/components/Loading";


export const revalidate = 300; //5 minutter

export default async function TeamsPage() {
  const teamsData = await getTeamsData();
  if(!teamsData){
    <Loading/>
  }

  return <TeamsClientPage initialTeamsData={teamsData} />;
}
