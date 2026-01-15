import {PortableTextBlock} from "@portabletext/react";
import {Image} from "@/sanity/types/image";

export interface JoinComponent {
    header: string;
    description: PortableTextBlock[];
    image: Image;
}
export interface JoinPage {
    _id: string;
    applyLink: string;
    images: Array<
        Image & {
        alt: string;
    }
    >;
    components: JoinComponent[];
}
