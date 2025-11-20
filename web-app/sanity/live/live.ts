import { defineLive } from "next-sanity/live";
import { client } from "@/sanity/config";
import { draftMode } from "next/headers";


export const { sanityFetch, SanityLive } = defineLive({
  client,
});
export async function sanityFetchWithDraft(args: Parameters<typeof sanityFetch>[0]) {
  const { isEnabled } = await draftMode();

  return sanityFetch({
    ...args,
    perspective: isEnabled ? "previewDrafts" : "published",
  });
}