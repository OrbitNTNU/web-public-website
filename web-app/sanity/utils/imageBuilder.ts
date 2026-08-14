import imageUrlBuilder, { type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/config";

type ImageBuilderOptions = {
  width?: number;
  height?: number;
  fit?: "clip" | "crop" | "fill" | "fillmax" | "max" | "scale" | "min";
  format?: "webp" | "jpg" | "png";
  quality?: number;
};

const builder = imageUrlBuilder(client);

export const imageBuilder = (
    source?: SanityImageSource | null,
    opts: ImageBuilderOptions = {},
): string => {
  if (!source) return "";

  let image = builder.image(source);

  if (opts.width) image = image.width(opts.width);
  if (opts.height) image = image.height(opts.height);
  if (opts.fit) image = image.fit(opts.fit);
  if (opts.format) image = image.format(opts.format);
  if (opts.quality) image = image.quality(opts.quality);

  return image.url();
};