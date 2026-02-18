export interface Specifications {
    _key: string;
    _type: "specificationSection";
    image: string;
    title: string;
    specifications: {
        label: string;
        value: string;
    }[];
}