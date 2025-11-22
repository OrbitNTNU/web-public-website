// sanity/config.ts
import { createClient } from "@sanity/client";

const projectId = "mt6p5031";
const dataset = "production";
const apiVersion = "2024-01-01";

// Base factory: published only or preview with drafts
export function getSanityClient(preview: boolean = false) {
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !preview, // CDN for published, direct for preview
    perspective: preview ? "previewDrafts" : "published",
    token: preview ? process.env.PRESENTATION : undefined,
  });
}

// Default client: PRODUCTION, PUBLISHED ONLY
export const client = getSanityClient(false);
