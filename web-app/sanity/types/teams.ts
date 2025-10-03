// sanity-types.d.ts

import { PortableTextBlock } from "@portabletext/react";

// ====== Shared types ======
export interface Slug {
  _type: "slug";
  current: string;
}

export interface Image {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface File {
  _type: "file";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

// ====== Sections ======
export interface HeroSection {
  _key: string;
  _type: "heroSection";
  title: string;
  subtitle: string;
  backgroundImage?: Image;
  video?: string; // URL
}

export interface TextSection {
  _key: string;
  _type: "textSection";
  title?: string;
  body?: PortableTextBlock[];
}

export interface ImageSection {
  _key: string;
  _type: "imageSection";
  caption: string;
  image: Image;
  alignment: "left" | "right" | "center";
}

export interface VideoSection {
  _key: string;
  _type: "videoSection";
  title?: string;
  url?: string;
  autoplay?: boolean;
}

export interface GallerySection {
  _key: string;
  _type: "gallerySection";
  images?: Image[];
}

export interface CtaSection {
  _key: string;
  _type: "ctaSection";
  heading?: string;
  buttonText?: string;
  buttonUrl?: string;
}

export interface CustomBlock {
  _key: string;
  _type: "customBlock";
  body?: (PortableTextBlock | Image | File)[];
}
  
export type ContentSection =
  | HeroSection
  | TextSection
  | ImageSection
  | VideoSection
  | GallerySection
  | CtaSection
  | CustomBlock;

// ====== Team Document ======
export interface TeamDocument {
  _type: "team";
  _id: string;
  team?: number[];
  slug: Slug;
  content?: ContentSection[];
}
