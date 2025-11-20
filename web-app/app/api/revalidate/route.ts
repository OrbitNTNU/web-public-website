import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const secret = process.env.REVALIDATION_SECRET;
    const token = req.nextUrl.searchParams.get("secret");

    if (!secret || token !== secret) {
        return new Response("Invalid token", { status: 401 });
    }

    const body = await req.json().catch(() => null);

    // Always revalidate static pages
    revalidatePath("/");
    revalidatePath("/articles");
    revalidatePath("/projects");
    revalidatePath("/team");
    revalidatePath("/join");
    revalidatePath("/sponsors");

    if (!body) {
        return Response.json({ ok: true });
    }

    const { _type, slug, team } = body as {
        _type?: string;
        slug?: { current?: string };
        team?: number[];
    };

    // Articles
    if (_type === "article" && slug?.current) {
        revalidatePath(`/articles/${slug.current}`);
    }

    // Big projects
    if (_type === "bigProject" && slug?.current) {
        revalidatePath(`/projects/${slug.current}`);
    }

    // Sub orbital projects
    if (_type === "subOrbitalProject" && slug?.current) {
        revalidatePath(`/projects/${slug.current}`);
    }

    // Teams not slug
    if (_type === "teamPage" && Array.isArray(team)) {
        team.forEach((id) => {
            revalidatePath(`/team/${id}`);
        });
    }

    return Response.json({ ok: true });
}
