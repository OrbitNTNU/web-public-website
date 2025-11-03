import { DoubleImage } from "./DoubleImage";

export interface DoubleImageCollage {
  _key: string;
  _type: "doubleImageCollage";
  items: DoubleImage[];
}
