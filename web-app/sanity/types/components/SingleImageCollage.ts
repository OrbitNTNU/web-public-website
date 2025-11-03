import { ImageAndCaption } from "./ImageAndCaption";

export interface SingleImageCollage {
  _key: string;
  _type: "singleImageCollage";
  items: ImageAndCaption[];
}
