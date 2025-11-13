import { Image } from "../image";

// Shared link type
export type Link =
  | { type: "internal"; internal: { _type: string; slug: string } }
  | { type: "external"; external: string };

// Matches your schema exactly (with strict image types)
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

// Used inside singleImageCollage
export interface ImageAndCaption {
  _key: string;
  _type: "imageAndCaption";
  src: Image;
  alt?: string;
  title?: string;
  caption?: string;
  wideCaption?: boolean;
  link?: string;
  variant?: string;
}

export interface MembersSection {
  _key: string;
  _type: "membersSection";
}

export interface LargeQuoteSection {
  _key: string;
  _type: "largeQuote";
  quote: string;
}

export interface LargeImageSection {
  _key: string;
  _type: "largeImage";
  image: Image;
  caption?: string;
}

export interface DoubleImageCollageSection {
  _key: string;
  _type: "doubleImageCollage";
  items: DoubleImage[];
}

export interface DoubleImageWideSection {
  _key: string;
  _type: "doubleImageWide";
  variant?: string;
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

export interface SingleImageCollageSection {
  _key: string;
  _type: "singleImageCollage";
  items: ImageAndCaption[];
}

export interface TriImageCollageSection {
  _key: string;
  _type: "triImageCollage";
  title?: string;
  caption?: string;
  src1: Image;
  alt1?: string;
  src2: Image;
  alt2?: string;
  src3: Image;
  alt3?: string;
  variant?: "large-left" | "large-right";
  wideCaption?: boolean;
}

export interface FlowingTriImageCollageSection {
  _key: string;
  _type: "flowingTriImageCollage";
  items: TriImageCollageSection[];
}

export interface ArticleReferenceSection {
  _key: string;
  _type: "articleReference";
  articles: {
    _id: string;
    title: string;
    slug: string;
    mainImage: Image;
  }[];
}

export interface GallerySection {
  _key: string;
  _type: "gallery";
  images: {
    image: Image;
    alt: string;
    tagline?: string;
    link?: string;
  }[];
}

// ─────────────────────────────────────────
// Union + Page Type
// ─────────────────────────────────────────

export type TeamPageSection =
  | MembersSection
  | LargeQuoteSection
  | LargeImageSection
  | DoubleImageCollageSection
  | DoubleImageWideSection
  | SingleImageCollageSection
  | TriImageCollageSection
  | FlowingTriImageCollageSection
  | ArticleReferenceSection
  | GallerySection;

export interface TeamPage {
  type: "team";
  _id: string;
  team?: number[];
  sections: TeamPageSection[];
}
