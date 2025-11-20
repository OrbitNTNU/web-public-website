import { draftMode } from "next/headers";
import { sanityFetch } from "./live";

export async function sanityFetchWithDraft(args: Parameters<typeof sanityFetch>[0]) {
    const { isEnabled } = await draftMode();

    return sanityFetch({
        ...args,
        perspective: isEnabled ? "previewDrafts" : "published",
    });
}
