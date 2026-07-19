export interface OtSection {
    _key: string;
    _type: "otSection";
    heading: string;
    description?: unknown[]; // Portable Text blocks
}
