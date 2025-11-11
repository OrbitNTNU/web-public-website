import { defineQuery } from "groq";

export const TEAM_LIST_QUERY = defineQuery(`
  *[_type == "teamPage"] | order(title asc) {
    _id,
    title,
    description,
    "slug": slug.current
  }
`);

export const TEAM_PAGE_QUERY = defineQuery(`
  *[_type == "teamPage" && slug.current == $slug]{
    _id,
    title,
    description,
    "slug": slug.current,

    sections[]{
      _key,
      _type,

      /* MEMBERS SECTION */
      _type == "membersSection" => {
        _key,
        _type
      },

      /* LARGE QUOTE */
      _type == "largeQuote" => {
        _key,
        _type,
        quote
      },

      /* LARGE IMAGE */
      _type == "largeImage" => {
        _key,
        _type,
        image{asset->},
        caption
      },

      /* DOUBLE IMAGE COLLAGE */
      _type == "doubleImageCollage" => {
        _key,
        _type,
        items[]{
          _key,
          _type,
          variant,
          image1{asset->},
          alt1,
          title1,
          caption1,
          link1,
          image2{asset->},
          alt2,
          title2,
          caption2,
          link2
        }
      },

      /* DOUBLE IMAGE WIDE */
      _type == "doubleImageWide" => {
        _key,
        _type,
        items[]{
          _key,
          _type,
          variant,
          image1{asset->},
          alt1,
          title1,
          caption1,
          link1,
          image2{asset->},
          alt2,
          title2,
          caption2,
          link2
        }
      },

      /* SINGLE IMAGE COLLAGE */
      _type == "singleImageCollage" => {
        _key,
        _type,
        items[]{
          _key,
          _type,
          src{asset->},
          alt,
          title,
          caption,
          wideCaption,
          link,
          variant
        }
      },

      /* TRI IMAGE COLLAGE */
      _type == "triImageCollage" => {
        _key,
        _type,
        title,
        caption,
        src1{asset->},
        alt1,
        src2{asset->},
        alt2,
        src3{asset->},
        alt3,
        variant,
        wideCaption
      },

      /* FLOWING TRI IMAGE COLLAGE */
      _type == "flowingTriImageCollage" => {
        _key,
        _type,
        items[]{
          _key,
          _type,
          title,
          caption,
          src1{asset->},
          alt1,
          src2{asset->},
          alt2,
          src3{asset->},
          alt3,
          variant,
          wideCaption
        }
      },

      /* ARTICLE REFERENCE */
      _type == "articleReference" => {
        _key,
        _type,
        articles[]->{
          _id,
          title,
          "slug": slug.current,
          mainImage{asset->}
        }
      },

      /* GALLERY */
      _type == "gallery" => {
        _key,
        _type,
        images[]{
          image{asset->},
          alt,
          tagline,
          link
        }
      }
    }
  }
`);
