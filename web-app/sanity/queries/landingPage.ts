import { defineQuery } from "groq";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[_type == "landingPage"][0]{
    _id,
    title,
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

      _type == "projectsShowcase" => {
        _type,
        title,
        projectType,
        projects[]->{
          _id,
          _type,
          title,
          teaser,
          patch,
          slug,
          gradientColors,
          image,
          publishedAt
        }
      },

      _type == "joinCardRef" => {
        _type,
        "data": *[_type=="joinCard" && _id=="singleton-joinCard"][0]{
          title,
          intro,
          disciplines[]{title, icon, desc, color},
          benefits[]{title, icon, desc, color},
          ctaText,
          ctaUrl
        }
      },

      _type == "forSponsorsCardRef" => {
        _type,
        "data": *[_type=="forSponsorsCard" && _id=="singleton-forSponsorsCard"][0]{
          title,
          intro,
          ctaButtons[] {
            text,
            url,
            color,
            hoverColor,
            textColor
          }
        }
      }
    }
  }
`);
