import { defineQuery } from "groq";

export const ARTICLE_PAGE_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    sections[] {
      ...,
      _type == "largeQuote" => {
        _type,
        quote
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
      _type == "projectsShowcase" => {
        _type
      },
      _type == "instagramEmbed" => {
        _type,
        embedUrl
      },
      _type == "subOrbitalShowcase" => {
        _type
      }
    }
  }
`);

export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    mainImage,
    publishedAt
  }
`);