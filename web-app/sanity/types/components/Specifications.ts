import { Image } from "../image";
export interface Specifications {
    _key: string;
    _type: "specificationSection";
    image: Image;
    title: string;
    specifications: {
        label: string;
        value: string;
    }[],
    // Trenger ikke egt testinfo
    testInfo?: string;
}