import { Image } from "../image";

export interface LargeImage {
  _key: string;
  _type: "largeImage";
  image: Image;
  alt: string;
  caption?: string;
}
