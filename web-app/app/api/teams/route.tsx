import { getStaticTeamsData } from "@/lib/getTeamsData";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const teams = await getStaticTeamsData();
    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 },
    );
  }
}
