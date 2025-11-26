import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const dm = await draftMode();
  dm.disable();

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug") ?? "/";

  return NextResponse.redirect(
    new URL(slug, req.url.replace("/api/exit-draft", "")),
  );
}
