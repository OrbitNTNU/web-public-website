import { Image } from "../image";

export interface Gallery {
  _key: string;
  _type: "gallery";
  images: {
    image: Image;
    alt: string;
    tagline?: string;
    link?: string;
  }[];
}
