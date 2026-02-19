// ─────────────── COMPONENT TYPES ───────────────

import { DoubleImage } from "../components/DoubleImage";
import { DoubleImageCollage } from "../components/DoubleImageCollage";
import { LargeImage } from "../components/LargeImage";
import { LargeQuote } from "../components/LargeQuote";
import { ProjectsShowcase } from "../components/ProjectsShowcase";
import { SpanningText } from "../components/SpanningText";

export type ProjectsPageSection =
  | LargeQuote
  | LargeImage
  | SpanningText
  | DoubleImage
  | DoubleImageCollage
  | ProjectsShowcase;

// 🪩 Projects Page Document
export interface ProjectsPage {
  _type: "projectsPage";
  _id: string;
  title: string;
  sections: ProjectsPageSection[];
}
