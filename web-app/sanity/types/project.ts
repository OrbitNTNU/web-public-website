import { DoubleImage } from "./components/DoubleImage";
import { DoubleImageCollage } from "./components/DoubleImageCollage";
import { LargeImage } from "./components/LargeImage";
import { LargeQuote } from "./components/LargeQuote";
import { ProjectsShowcase } from "./components/ProjectsShowcase";
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
  | ProjectsShowcase;

export interface BaseProject {
  _key: string;
  _id: string;
  title: string;
  patch?: Image;
  slug: {
    current: string;
  };
  image: Image;
  sections?: ProjectSection[];
}

//Herja her ja
export interface BigProject extends BaseProject {
  _type: "bigProject";
  teaser: string;
  gradientColors?: string[];
}

export interface SubOrbitalProject extends BaseProject {
  _type: "subOrbitalProject";
  year: number;
}
