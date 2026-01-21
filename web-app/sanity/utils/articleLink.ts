import {ArticlePageSection} from "@/sanity/types/pages/articlePage";
import ArticleBaseFields from "@/sanity/types/pages/articlePage"
import {Category} from "@/sanity/utils/category";
import {PortableTextBlock} from "@portabletext/react";

export interface InternalArticle {
    _type: "article";
    _id: string;
    title: string;
    mainImage: {
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
    };
    publishedAt: string;
    teaser: PortableTextBlock[];
    category?: Category;
    linkType: "internal";
    slug: {
        current: string;
    };
    sections: ArticlePageSection[];
    link: null;
}

export interface ExternalArticle {
    _type: "article";
    _id: string;
    title: string;
    mainImage: {
        asset: {
            _id: string;
            url: string;
        };
        alt?: string;
    };
    publishedAt: string;
    teaser: PortableTextBlock[];
    category?: Category;
    linkType: "external";
    slug: null;
    sections: null;
    link: string;
}
