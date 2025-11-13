import { NextResponse } from "next/server";
import {getTeamsSlug} from "@/components/TeamsPage/lib/getTeamsSlug";

const slugify = (name: string) =>
    name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

export async function GET() {
    try {
        const teams = await getTeamsSlug();

        if (!teams) {
            return NextResponse.json({ error: "No teams found" }, { status: 404 });
        }

        const teamsWithSlug = teams.map((t: { teamName: string; }) => ({
            ...t,
            slug: slugify(t.teamName),
        }));

        return NextResponse.json({ teams: teamsWithSlug });
    } catch (error) {
        console.error("Error fetching teams:", error);
        return NextResponse.json(
            { error: "Failed to fetch teams" },
            { status: 500 }
        );
    }
}
