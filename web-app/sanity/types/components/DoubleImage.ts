import { Image } from "../image";

export interface DoubleImage {
  _key: string;
  _type: "doubleImage";
  variant: "half-half" | "one-third-two-third" | "two-third-one-third";
  image1: Image;
  alt1?: string;
  title1?: string;
  caption1?: string;
  link1?: string;
  image2: Image;
  alt2?: string;
  title2?: string;
  caption2?: string;
  link2?: string;
}
