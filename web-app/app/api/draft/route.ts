import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const secret = searchParams.get("secret");
    const slug = searchParams.get("slug") ?? "/";

    if (
        process.env.SANITY_PREVIEW_SECRET &&
        secret !== process.env.SANITY_PREVIEW_SECRET
    ) {
        return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    const dm = await draftMode();
    dm.enable();

    return NextResponse.redirect(
        new URL(slug, req.url.replace("/api/draft", ""))
    );
}
