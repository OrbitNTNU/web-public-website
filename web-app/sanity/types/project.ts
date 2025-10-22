import { Image } from "./image";
import { DoubleImage, DoubleImageCollage, LargeImage, LargeQuote, SpanningText } from "./landingPage";

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
  ;

export interface BigProject {
  _key: string;
  _id: string;
  _type: "bigProject";
  title: string;
  teaser: string;
  patch: Image;
  slug: {
    current: string;
  };
  gradientColors: string[];
  sections: ProjectSection[];
}