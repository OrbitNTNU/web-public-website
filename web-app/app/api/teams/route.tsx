import { NextResponse } from "next/server";
import { getTeamsData } from "@/components/TeamsPage/lib/getTeamsData";

export async function GET() {
  try {
    const teams = await getTeamsData();
    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Error fetching teams:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 },
    );
  }
}
