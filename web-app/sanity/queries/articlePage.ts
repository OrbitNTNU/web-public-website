import { defineQuery } from "groq";

export const ARTICLE_PAGE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    teaser,
    slug,
    mainImage,
    publishedAt,
    sections[] {
      ...,
      _type == "largeQuote" => {
        _type,
        quote,
        author
      },
      _type == "largeImage" => {
        _type,
        image,
        caption
      },
      _type == "spanningText" => {
        _type,
        text
      },
      _type == "doubleImage" => {
        _type,
        variant,
        image1,
        alt1,
        title1,
        caption1,
        link1,
        image2,
        alt2,
        title2,
        caption2,
        link2
      },
      _type == "doubleImageCollage" => {
        _type,
        items[] {
          _type,
          variant,
          image1,
          alt1,
          title1,
          caption1,
          link1,
          image2,
          alt2,
          title2,
          caption2,
          link2
        }
      },
      _type == "imageAndCaption" => {
         _type,
          src,
          alt,
          title,
          caption,
          wideCaption,
          link,
          variant
      },
      _type == "singleImageCollage" => {
        _type,
        items[] {
          _type,
          src,
          alt,
          title,
          caption,
          wideCaption,
          link,
          variant
        }
      },
      _type == "triImageCollage" => {
        _type,
        title,
        caption,
        src1,
        alt1,
        src2,
        alt2,
        src3,
        alt3,
        variant,
        wideCaption
      },
      _type == "textHeavy" => {
        _type,
        content
      }
    }
  }
`);

export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    teaser,
    slug,
    mainImage,
    publishedAt
  }
`);
