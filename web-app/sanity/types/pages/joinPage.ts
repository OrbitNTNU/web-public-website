import {PortableTextBlock} from "@portabletext/react";
import {Image} from "@/sanity/types/image";

export interface JoinButton {
    label: string;
    href: string;
}
export interface JoinComponent {
    header: string;
    description: PortableTextBlock[];
    image: Image;
    button: JoinButton;
}
export interface JoinPage {
    _id: string;
    images: Array<
        Image & {
        alt: string;
    }
    >;
    components: JoinComponent[];
}
