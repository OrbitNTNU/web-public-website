import { TriImageCollage } from "./TriImageCollage";

export interface FlowingTriImageCollage {
  _key: string;
  _type: "flowingTriImageCollage";
  items: TriImageCollage[];
}