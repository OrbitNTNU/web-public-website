import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    const dm = await draftMode();
    dm.enable();

    return NextResponse.json({ ok: true });
}
