export interface Team {
    teamID: number;
    teamName: string;
    group: string;
}

export async function getTeamsData(): Promise<Team[] | null> {
    try {
        const res = await fetch(
            "https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo",
            { next: { revalidate: 300 } }
        );

        if (!res.ok) {
            console.error("Upstream error:", res.status);
            return null;
        }

        const data = await res.json();
        const teams = data.result?.data?.json ?? [];

        return teams.map((t: any) => ({
            teamID: t.teamID,
            teamName: t.teamName,
            group: t.group,
        }));
    } catch (err) {
        console.error("Failed to fetch teams:", err);
        return null;
    }
}
