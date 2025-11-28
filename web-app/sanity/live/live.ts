import { draftMode } from "next/headers";
import { getSanityClient } from "@/sanity/config";

type SanityFetchArgs = {
  query: string;
  params?: Record<string, unknown>;
};

async function isPreviewRequest(): Promise<boolean> {
  const dm = await draftMode();
  return dm.isEnabled;
}

export async function sanityFetch<T>({
  query,
  params = {},
}: SanityFetchArgs): Promise<{ data: T }> {
  const isPreview = await isPreviewRequest();

  const client = getSanityClient(isPreview);

  const data = await client.fetch<T>(query, params);
  return { data };
}
