// ─────────────── COMPONENT TYPES ───────────────

import { Image } from "./image";
import { BigProject } from "./project";

// 🪐 Large Quote
export interface LargeQuote {
  _key: string;
  _type: "largeQuote";
  quote: string;
}

// 🖼️ Large Image
export interface LargeImage {
  _key: string;
  _type: "largeImage";
  image: Image;
  caption?: string;
}

// 🧾 Spanning Text
export interface SpanningText {
  _key: string;
  _type: "spanningText";
  text: string;
}

// 🪞 Double Image
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

// 🧩 Double Image Collage
export interface DoubleImageCollage {
  _key: string;
  _type: "doubleImageCollage";
  items: DoubleImage[];
}

// 🚀 Projects Showcase

export interface ProjectsShowcase {
  _key: string;
  _type: "projectsShowcase";
  title: string;
  bigProjects: BigProject[];
}

export interface SubOrbitalShowcase {
  _key: string;
  _type: "subOrbitalShowcase";
  placeholder: string;
}

// ─────────────── PAGE STRUCTURE ───────────────

// Union of all section types
export type LandingPageSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | ProjectsShowcase
  | SubOrbitalShowcase;

// 🪩 Landing Page Document
export interface LandingPage {
  _type: "landingPage";
  _id: string;
  title: string;
  sections: LandingPageSection[];
}
