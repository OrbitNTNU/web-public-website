export const runtime = "nodejs";

import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/config";

const handler = defineEnableDraftMode({
  client: client.withConfig({
    token: process.env.PRESENTATION,
  }),
});

export async function GET(req: Request) {
  return handler.GET(req);
}
