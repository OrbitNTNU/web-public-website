import { NextResponse } from "next/server";

const BEHOLD_FEED_URL = "https://feeds.behold.so/Qi51HbmMAJOhiCxbYMU4";

export async function GET() {
  try {
    const res = await fetch(BEHOLD_FEED_URL, { next: { revalidate: 300 } }); // optional caching
    if (!res.ok) throw new Error("Failed to fetch Behold feed");

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching Behold feed:", error);
    return NextResponse.json(
      { error: "Failed to fetch Behold feed" },
      { status: 500 },
    );
  }
}
