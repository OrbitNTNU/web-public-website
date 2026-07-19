import { Image } from "../image";

export interface TimelineCard {
    _key?: string;
    imageTitle: string;
    imageDescription?: unknown[]; // Portable Text blocks
    image: Image;
}

export interface TimelineSection {
    _key: string;
    _type: "timelineSection";
    heading: string;
    subheading?: string;
    timelineCollection?: TimelineCard[];
}
