// ─────────────── COMPONENT TYPES ───────────────

import { DoubleImage } from "../components/DoubleImage";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { InstagramEmbed } from "../components/InstagramEmbed";
import { LargeImage } from "../components/LargeImage";
import { LargeQuote } from "../components/LargeQuote";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { SpanningText } from "../components/SpanningText";
import { SubOrbitalShowcase } from "../components/SubOrbitalShowcase";
import { ForSponsorsCardType } from "../forSponsorsCard";
import { JoinCardType } from "../joinCard";

export type LandingPageSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | ProjectsShowcase
  | SubOrbitalShowcase
  | InstagramEmbed
  | JoinCardType
  | ForSponsorsCardType;

// 🪩 Landing Page Document
export interface LandingPage {
  _type: "landingPage";
  _id: string;
  title: string;
  sections: LandingPageSection[];
}
