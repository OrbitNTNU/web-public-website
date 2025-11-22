import { defineLive } from "next-sanity/live";
import { getSanityClient } from "@/sanity/config";

export const { sanityFetch, SanityLive } = defineLive({
  client: getSanityClient(),


  serverToken: false,
  browserToken: false,
});
