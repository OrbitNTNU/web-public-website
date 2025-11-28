import { defineQuery } from "groq";

export const LANDING_PAGE_QUERY = defineQuery(`
  *[
    _type == "landingPage" &&
    !(_id in path("drafts.**"))
  ][0]{
    _id,
    title,
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
          publishedAt,
          year
        }
      },

      _type == "joinCard" => {
        _type,
      },

      _type == "instagramEmbed" => {
        _type,
      },

      _type == "forSponsorsCardRef" => {
        _type,
        "data": *[
          _type=="forSponsorsCard" &&
          _id=="singleton-forSponsorsCard" &&
          !(_id in path("drafts.**"))
        ][0]{
          title,
          intro,
        }
      }
    }
  }
`);
