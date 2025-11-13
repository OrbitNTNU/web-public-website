import { ArticleReference } from "../components/ArticleReference";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { DoubleImageWide } from "../components/DoubleImageWide";
import { FlowingTriImageCollage } from "../components/FlowingTriImageCollage";
import { Gallery } from "../components/Gallery";
import { LargeImage } from "../components/LargeImage";
import { LargeQuote } from "../components/LargeQuote";
import { MembersShowcase } from "../components/MemberShowcase";
import { SingleImageCollage } from "../components/SingleImageCollage";
import { TriImageCollage } from "../components/TriImageCollage";

// ─────────────────────────────────────────
// Union + Page Type
// ─────────────────────────────────────────

export type TeamPageSection =
  | LargeQuote
  | LargeImage
  | DoubleImageCollage
  | DoubleImageWide
  | SingleImageCollage
  | TriImageCollage
  | FlowingTriImageCollage
  | ArticleReference
  | Gallery
  | MembersShowcase;

export interface TeamPage {
  type: "team";
  _id: string;
  team?: number[];
  sections: TeamPageSection[];
}
