import { NextResponse } from "next/server";

export async function GET() {
  try {
    const urls = {
      memberDistributionInTeams:
        "https://lifesupport.orbitntnu.com/api/trpc/statistics.getMemberDistributionInTeams",
    };

    const [memberResp] =  await Promise.all([
        fetch(urls.memberDistributionInTeams),
      ]);

    if (!memberResp.ok) throw new Error("Failed fetching member distribution");

    const [memberData] =
      await Promise.all([
        memberResp.json(),
      ]);

    const data = {
      totalMembers: memberData.result?.data?.json.totalMembers ?? 0,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching statistics:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 },
    );
  }
}
