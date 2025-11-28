import { defineQuery } from "groq";

export const ALL_BIG_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "bigProject" &&
    !(_id in path("drafts.**"))
  ]{
    _id,
    title,
    teaser,
    patch,
    slug,
    gradientColors,
    image
  }
`);

export const BIG_PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "bigProject" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    teaser,
    "slug": slug,
    patch,
    gradientColors,
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
        alt,
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
      }
    }
  }
`);

export const ALL_SUBORBITAL_PROJECTS_QUERY = defineQuery(`
  *[
    _type == "subOrbitalProject" &&
    !(_id in path("drafts.**"))
  ] | order(year desc) {
    _id,
    title,
    teaser,
    patch,
    slug,
    gradientColors,
    image,
    year
  }
`);

export const SUBORBITAL_PROJECT_BY_SLUG_QUERY = defineQuery(`
  *[
    _type == "subOrbitalProject" &&
    !(_id in path("drafts.**")) &&
    slug.current == $slug
  ][0]{
    _id,
    _type,
    title,
    teaser,
    "slug": slug,
    patch,
    gradientColors,
    publishedAt,
    image,
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
          publishedAt
        }
      }
    }
  }
`);
