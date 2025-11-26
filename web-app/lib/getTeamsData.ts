export async function getTeamsData() {
  try {
    const res = await fetch(
      "https://lifesupport.orbitntnu.com/api/trpc/teams.getPublicTeamPageInfo",
      { next: { revalidate: false } },
    );

    if (!res.ok) {
      console.error("Upstream error:", res.status);
      return null;
    }

    const data = await res.json();
    const teams = data.result?.data?.json ?? [];
    return JSON.parse(JSON.stringify(teams));
  } catch (err) {
    console.error("Failed to fetch teams:", err);
    return null;
  }
}
