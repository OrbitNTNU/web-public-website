export interface Team {
    teamID: number;
    teamName: string;
    group: string;
}


interface RawTeam {
    teamID: number;
    teamName: string;
    group: string;
}

export async function getTeamsSlug(): Promise<Team[] | null> {
    try {
        const res = await fetch(
            "https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo",
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            console.error("Upstream error:", res.status);
            return null;
        }

        const data: {
            result?: { data?: { json?: RawTeam[] } };
        } = await res.json();

        const teams = data.result?.data?.json ?? [];

        return teams.map((t: RawTeam): Team => ({
            teamID: t.teamID,
            teamName: t.teamName,
            group: t.group,
        }));
    } catch (err) {
        console.error("Failed to fetch teams:", err);
        return null;
    }
}
