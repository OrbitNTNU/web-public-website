import { DoubleImage } from "./components/DoubleImage";
import { DoubleImageCollage } from "./components/DoubleImageCollage";
import { ImageAndCaption } from "./components/ImageAndCaption";
import { LargeImage } from "./components/LargeImage";
import { LargeQuote } from "./components/LargeQuote";
import { SingleImageCollage } from "./components/SingleImageCollage";
import { SpanningText } from "./components/SpanningText";
import { Image } from "./image";

export interface BannerImage {
  _key: string;
  _type: "bannerImage";
  image: Image;
}

export type ProjectSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | BannerImage
  | ImageAndCaption
  | SingleImageCollage;

export interface BaseProject {
  _key: string;
  _id: string;
  title: string;
  teaser?: string;
  patch?: Image;
  slug: {
    current: string;
  };
  image: Image;
  gradientColors?: string[];
  sections?: ProjectSection[];
  publishedAt: string;
}

//Herja her ja
export interface BigProject extends BaseProject {
  _type: "bigProject";
}

export interface SubOrbitalProject extends BaseProject {
  _type: "subOrbitalProject";
  year: number;
}
