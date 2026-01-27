type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  format?: "webp" | "jpg" | "png";
  quality?: number;
};

export const imageBuilder = (
    source?:
        | string
        | { asset?: { _ref?: string; _id?: string; url?: string | null } }
        | null,
    opts: ImageBuilderOptions = {},
): string => {
  if (!source) return "";

  const ref =
      typeof source === "string"
          ? source
          : source.asset?._ref || source.asset?._id;

  const directUrl =
      typeof source !== "string" ? source.asset?.url ?? undefined : undefined;

  const applyParams = (url: URL) => {
    // Only apply params if explicitly provided
    if (opts.width) url.searchParams.set("w", String(opts.width));
    if (opts.height) url.searchParams.set("h", String(opts.height));
    if (opts.fit) url.searchParams.set("fit", opts.fit);
    if (opts.format) url.searchParams.set("fm", opts.format);
    if (opts.quality) url.searchParams.set("q", String(opts.quality));

    return url.toString();
  };

  // If Sanity already gives us a direct URL, just return it untouched
  if (directUrl) {
    try {
      const url = new URL(directUrl);
      return Object.keys(opts).length ? applyParams(url) : url.toString();
    } catch {
      console.warn("Invalid direct image URL:", directUrl);
      return "";
    }
  }

  if (!ref || !ref.startsWith("image-")) {
    console.warn("Invalid Sanity image reference:", ref);
    return "";
  }

  const [, id, dimensions, format] = ref.split("-");
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

  // Return raw CDN URL unless transforms are requested
  return Object.keys(opts).length ? applyParams(url) : url.toString();
};
