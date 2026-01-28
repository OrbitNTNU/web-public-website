type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  format?: "webp" | "jpg" | "png";
  quality?: number;
};

const DEFAULT_IMAGE_OPTIONS: ImageBuilderOptions = {
  width: 1600,
  quality: 75,
};

export const imageBuilder = (
    source?:
        | string
        | { asset?: { _ref?: string; _id?: string; url?: string | null } }
        | null,
    opts: ImageBuilderOptions = {},
): string => {
  if (!source) return "";

  const finalOpts: ImageBuilderOptions = {
    ...DEFAULT_IMAGE_OPTIONS,
    ...opts,
  };

  const ref =
      typeof source === "string"
          ? source
          : source.asset?._ref || source.asset?._id;

  const directUrl =
      typeof source !== "string" ? source.asset?.url ?? undefined : undefined;

  const applyParams = (url: URL) => {
    if (finalOpts.width) url.searchParams.set("w", String(finalOpts.width));
    if (finalOpts.height) url.searchParams.set("h", String(finalOpts.height));
    if (finalOpts.fit) url.searchParams.set("fit", finalOpts.fit);
    if (finalOpts.format) url.searchParams.set("fm", finalOpts.format);
    if (finalOpts.quality) url.searchParams.set("q", String(finalOpts.quality));

    return url.toString();
  };

  if (directUrl) {
    try {
      const url = new URL(directUrl);
      return applyParams(url);
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

  return applyParams(url);
};
