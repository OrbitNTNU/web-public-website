import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: "2023-01-01",
  useCdn: true,
});
export function getSanityClient(useDrafts = false) {
  return client.withConfig({
    useCdn: !useDrafts,
  });
}