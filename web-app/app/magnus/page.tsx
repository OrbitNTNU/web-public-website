import { Loading } from "@/components/Loading";

import { getTeamPageForMagnus } from "@/sanity/fetch/SanityFetch";
import MagnusClientPage from "@/app/magnus/MagnusClientPage";
import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";
import { Team } from "../team/TeamsClientPage";

interface TeamPageProps {
    params: { slug: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
    const teamDocument = await getTeamPageForMagnus();

    const teamIdArray = teamDocument?.team;
    const teamsData = await getTeamsData() as Team[];
    
     if (!teamsData || !teamIdArray) {
        return <Loading />;
    }

    const team = teamsData.find((team) => team.teamID === teamIdArray[0]);

    if (!team) {
        return <Loading />;
    }

    return <MagnusClientPage teamDocument={teamDocument} team={team}/>;
}
