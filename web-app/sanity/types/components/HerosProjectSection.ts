import { Image } from "../image";

export interface HerosProjectSection {
    _key: string;
    _type: "herosProjectSection";
    title: string;
    subtitle: string;
    projectImageDesktop: Image;
    projectImageMobile: Image;
}
