// ─────────────── COMPONENT TYPES ───────────────

import { DoubleImage } from "../components/DoubleImage";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { LargeImage } from "../components/LargeImage";
import { LargeQuote } from "../components/LargeQuote";
import { SdgSection } from "../components/SdgSection";
import { SingleImageCollage } from "../components/SingleImageCollage";
import { SpanningText } from "../components/SpanningText";
import { StatisticsSection } from "../components/StatisticsSection";
import { TriImageCollage } from "../components/TriImageCollage";

export type AboutPageSection =
  | LargeQuote
  | TriImageCollage
  | DoubleImage
  | DoubleImageCollage
  | SingleImageCollage
  | LargeImage
  | SpanningText
  | StatisticsSection
  | SdgSection;

// 🪩 Landing Page Document
export interface AboutPage {
  _type: "aboutPage";
  _id: string;
  title: string;
  sections: AboutPageSection[];
}
