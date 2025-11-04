export interface ImageAndCaption {
  _key: string;
  _type: "imageAndCaption";
  src: string;
  alt: string;
  title?: string;
  caption?: string;
  wideCaption?: boolean;
  link?: string;
  variant?: "standard" | "large-left" | "large-right";
}
