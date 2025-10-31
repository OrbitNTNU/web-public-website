type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
};

/**
 * Safely build a Sanity image URL.
 * Accepts either a string _ref or an expanded asset with _ref | _id | url.
 */
export const imageBuilder = (
    source?: string | { asset?: { _ref?: string; _id?: string; url?: string | null } } | null,
    opts: ImageBuilderOptions = {},
): string => {
  if (!source) return "";

  const ref: string | undefined =
      typeof source === "string"
          ? source
          : source.asset?._ref || source.asset?._id || undefined;

  const directUrl =
      typeof source !== "string" && source.asset?.url
          ? source.asset.url
          : undefined;

  if (directUrl) {
    const url = new URL(directUrl);
    if (opts.width) url.searchParams.set("w", String(opts.width));
    if (opts.height) url.searchParams.set("h", String(opts.height));
    if (opts.fit) url.searchParams.set("fit", opts.fit);
    return url.toString();
  }

  if (!ref || !ref.startsWith("image-")) {
    console.warn("Invalid Sanity image reference:", ref);
    return "";
  }

  const parts = ref.split("-");
  const id = parts[1];
  const dimensions = parts[2];
  const format = parts[3];

  const filename = `${id}-${dimensions}.${format}`;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

  if (!projectId || !dataset) {
    console.warn("Missing Sanity project info for imageBuilder");
    return "";
  }

  const url = new URL(
      `https://cdn.sanity.io/images/${projectId}/${dataset}/${filename}`,
  );

  if (opts.width) url.searchParams.set("w", String(opts.width));
  if (opts.height) url.searchParams.set("h", String(opts.height));
  if (opts.fit) url.searchParams.set("fit", opts.fit);

  return url.toString();
};
