import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/config";

const token = process.env.PRESENTATION!;

const handler = defineEnableDraftMode({
    client: client.withConfig({ token }),
});

export async function GET(req: Request) {
    try {
        await client.fetch(`*[_type == "article"][0]._id`);
        return handler.GET(req);
    } catch (err) {
        console.error("Draft route error:", err);
        return new Response("Draft mode failed", { status: 500 });
    }
}
