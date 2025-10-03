import { client } from "../config"

export async function fetchTeamPage(teamSlug: string) {
  const query = `
    *[_type == "team" && slug.current == $teamSlug][0]{
      _id,
      teams,
      content[]{
        ...,
        _type == "heroSection" => {
          title,
          subtitle,
          backgroundImage,
          video
        },
        _type == "textSection" => {
          title,
          body
        },
        _type == "imageSection" => {
          caption,
          image,
          alignment
        },
        _type == "videoSection" => {
          title,
          url,
          autoplay
        },
        _type == "gallerySection" => {
          images
        },
        _type == "ctaSection" => {
          heading,
          buttonText,
          buttonUrl
        },
        _type == "customBlock" => {
          body
        }
      }
    }
  `
  return client.fetch(query, { teamSlug })
}

export async function fetchTeamSlug(teamId: number) {
  const query = `
    *[_type == "team" && $teamId in team][0]{
      slug {
        current
      }
    }
  `
  return client.fetch(query, { teamId })
}
