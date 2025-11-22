import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient } from "@/sanity/config";

const handler = defineEnableDraftMode({
    client: getSanityClient(true),
});

export async function GET(req: Request) {
    return handler.GET(req);
}
