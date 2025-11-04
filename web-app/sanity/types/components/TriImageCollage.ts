export interface TriImageCollage {
  _key: string;
  _type: "triImageCollage";
  title?: string;
  caption?: string;
  src1: string;
  alt1: string;
  src2: string;
  alt2: string;
  src3: string;
  alt3: string;
  variant?: "large-left" | "large-right";
  wideCaption?: boolean;
}
