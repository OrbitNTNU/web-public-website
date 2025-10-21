import { client } from "../config"

export async function fetchLandingPage() {
  const query = `
    *[_type == "landingPage"][0]{
      _id,
      title,
      sections[]{
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
          items[]{
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
          bigProjects[]->{
            _id,
            title,
            teaser,
            patch,
            slug,
            gradientColors,
          }
        },
      },
    }
  `
  return client.fetch(query)
}
