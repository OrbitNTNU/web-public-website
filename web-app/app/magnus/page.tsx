import { Loading } from "@/components/Loading";

import { getTeamPageForMagnus } from "@/sanity/fetch/SanityFetch";
import MagnusClientPage from "@/app/magnus/MagnusClientPage";

interface TeamPageProps {
    params: { slug: string };
}

export default async function TeamPage({ params }: TeamPageProps) {
    const teamDocument = await getTeamPageForMagnus();

    if (!teamDocument) {
        return <Loading />;
    }

    const teamId = teamDocument.team;
    console.log("Team ID:", teamId);

    return <MagnusClientPage teamDocument={teamDocument} />;
}
