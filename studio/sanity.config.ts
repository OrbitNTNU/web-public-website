import { createClient } from "@sanity/client";

export function getSanityClient(preview: boolean = false) {
  return createClient({
    projectId: "mt6p5031",
    dataset: "production",
    apiVersion: "2024-01-01",
    perspective: preview ? "previewDrafts" : "published",

    token: preview ? process.env.PRESENTATION : undefined,
    useCdn: !preview,
  });
}

export const client = getSanityClient(false);
