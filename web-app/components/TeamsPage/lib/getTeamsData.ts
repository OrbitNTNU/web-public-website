export async function getTeamsData() {
    const response = await fetch(
        "https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo",
        { next: { revalidate: 60 } }
    );

    if (!response.ok) throw new Error(`Upstream error: ${response.status}`);

    const data = await response.json();
    return data.result?.data?.json ?? [];
}
