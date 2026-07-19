export interface HlsItem {
    hlsHeader: string;
    hlsBody: string;
    gradientColors?: string[];
}

export interface HlsSection {
    _key: string;
    _type: "hlsSection";
    title: string;
    hls: HlsItem[];
}
