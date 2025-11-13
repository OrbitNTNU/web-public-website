import { Image } from "../image";

export interface DoubleImageWide {
  _key: string;
  _type: "doubleImageWide";
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
