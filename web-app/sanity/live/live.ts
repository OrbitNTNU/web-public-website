import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/config";

export const { sanityFetch, SanityLive } = defineLive({
  client,
});
