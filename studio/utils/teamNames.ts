
export interface Team {
    id: string;
    name: string;
}

export async function getTeamNames(): Promise<Team[]> {
    try {
        const res: Response = await fetch('https://lifesupport.orbitntnu.com/api/trpc/teams.getActiveTeamNamesWithIDs');
        const data: {
            result: {
                data: {
                    json: Team[];
                };
            };
        } = await res.json();
        return data.result.data.json;
    } catch (error) {
        console.error('Error fetching team names:', error);
        return [];
    }
}