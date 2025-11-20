import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/config";

export const { GET } = defineEnableDraftMode({
    client,
});
