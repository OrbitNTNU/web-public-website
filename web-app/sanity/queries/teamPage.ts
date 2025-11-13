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
  *[_type == "teamPage" && $teamId in team][0]{
    _id,
    teams,
    sections[]{
      ...,

      _type == "membersSection" => {
        _key,
        _type
      },

      _type == "largeQuote" => {
        _key,
        _type,
        quote
      },

      _type == "largeImage" => {
        _key,
        _type,
        image{asset->},
        caption
      },

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

