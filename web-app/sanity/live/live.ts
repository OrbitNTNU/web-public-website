import { defineLive } from "next-sanity/live";
import { getSanityClient } from "@/sanity/config";



export const { sanityFetch, SanityLive } = defineLive({
  // Published-only client
  client: getSanityClient(false),


  serverToken: process.env.PRESENTATION || false,
  browserToken: process.env.PRESENTATION || false,

});
