import { defineEnableDraftMode } from "next-sanity/draft-mode";
import {client} from "@/sanity/config";

export const token = process.env.PRESENTATION!;

export const { GET } = defineEnableDraftMode({
    client: client.withConfig({ token }),
});

