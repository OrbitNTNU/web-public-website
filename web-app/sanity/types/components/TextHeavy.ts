import { PortableTextBlock } from "next-sanity";

export interface TextHeavy {
  _key: string;
  _type: "textHeavy";
  content: PortableTextBlock[];
}
