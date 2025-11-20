import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const secret = process.env.REVALIDATION_SECRET;
    const token = req.nextUrl.searchParams.get("secret");

    if (!secret || token !== secret) {
        return new Response("Invalid token", { status: 401 });
    }

    const body = await req.json().catch(() => null);

    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/projects");
    revalidatePath("/team");
    revalidatePath("/join");
    revalidatePath("/sponsors");

    if (!body) {
        return Response.json({ ok: true });
    }

    const { _type, slug } = body as {
        _type?: string;
        slug?: { current?: string };
    };

    // Slug revalidation
    if (_type === "article" && slug?.current) {
        revalidatePath(`/articles/${slug.current}`);
    }

    if (_type === "project" && slug?.current) {
        revalidatePath(`/projects/${slug.current}`);
    }

    if (_type === "team" && slug?.current) {
        revalidatePath(`/team/${slug.current}`);
    }

    return Response.json({ ok: true });
}
