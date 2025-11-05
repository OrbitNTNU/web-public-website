// types/article.ts
import { LargeQuote } from "../components/LargeQuote";
import { LargeImage } from "../components/LargeImage";
import { SpanningText } from "../components/SpanningText";
import { DoubleImage } from "../components/DoubleImage";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { SingleImageCollage } from "../components/SingleImageCollage";
import { TriImageCollage } from "../components/TriImageCollage";
import { PortableTextBlock } from "next-sanity";
import { ImageAndCaption } from "../components/ImageAndCaption";
import { TextHeavy } from "../components/TextHeavy";

// TODO AUGUST FJERN SUBORBITALSHOWCASE, PROJECTSHOWCASE, OG INSTAGRAM EMBED HVIS DE IKKE SKAL BRUGES PÅ ARTIKELSIDER

export type ArticlePageSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | SingleImageCollage
  | TriImageCollage
  | ImageAndCaption
  | TextHeavy;

export interface Article {
  _type: "article";
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: {
    asset: {
      _id: string;
      url: string;
    };
    alt?: string;
  };
  publishedAt: string;
  teaser: PortableTextBlock[];
  sections: ArticlePageSection[];
}
