import { Image } from "../image";
export interface Pm {
    _key: string;
    _type: "pmSection";
    title: string;
    description: string;
    pmCards: {
        pmImage: Image;
        pmName: string;
        pmPeriodStart: string;
        pmPeriodEnd?: string | null;
    }[];
}