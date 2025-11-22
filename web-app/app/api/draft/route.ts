// app/api/draft/route.ts
import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient } from "@/sanity/config";

// Client that can see drafts
const previewClient = getSanityClient(true);

const handler = defineEnableDraftMode({
    // This client has token + perspective: "previewDrafts"
    client: previewClient,
});

export async function GET(req: Request) {
    try {
        await previewClient.fetch(`*[_type == "article"][0]._id`);
        return handler.GET(req);
    } catch (err) {
        console.error("Draft route error:", err);
        return new Response("Draft mode failed", { status: 500 });
    }
}
