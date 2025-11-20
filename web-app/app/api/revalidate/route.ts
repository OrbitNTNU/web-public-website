import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

async function handler(req: NextRequest) {
    const secret = process.env.REVALIDATION_SECRET;
    const token = req.nextUrl.searchParams.get("secret");

    if (!secret || token !== secret) {
        return new Response("Invalid token", { status: 401 });
    }

    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/projects");
    revalidatePath("/team");
    revalidatePath("/join");
    revalidatePath("/sponsors");

    return Response.json({ ok: true });
}

export async function GET(req: NextRequest) {
    return handler(req);
}

export async function POST(req: NextRequest) {
    return handler(req);
}
