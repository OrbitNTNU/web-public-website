// types/article.ts
import { LargeQuote } from "../components/LargeQuote";
import { LargeImage } from "../components/LargeImage";
import { SpanningText } from "../components/SpanningText";
import { DoubleImage } from "../components/DoubleImage";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { SingleImageCollage } from "../components/SingleImageCollage";
import { TriImageCollage } from "../components/TriImageCollage";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { SubOrbitalShowcase } from "../components/SubOrbitalShowcase";

export type ArticlePageSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | SingleImageCollage
  | TriImageCollage
  | ProjectsShowcase
  | InstagramEmbed
  | SubOrbitalShowcase;

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
  sections: ArticlePageSection[];
}
