import type { PortableTextBlock } from "next-sanity";
import { Image } from "../image";

export interface Pm {
    _key: string;
    _type: "pmSection";
    title: string;
    body: PortableTextBlock[];
    pmCards: {
        pmImage: Image;
        pmName: string;
        pmPeriodStart: string;
        pmPeriodEnd?: string | null;
    }[];
}