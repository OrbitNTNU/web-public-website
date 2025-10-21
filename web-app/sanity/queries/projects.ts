import { client } from "../config"

export async function fetchAllBigProjects() {
  const query = `
    *[_type == "bigProject"]{
      _id,
      title,
      teaser,
      patch,
      slug,
      gradientColors,
      order
    }
  `
  return client.fetch(query)
}

export async function fetchBigProjectBanner(slug: string) {
  const query = `
    *[_type == "bigProject" && slug.current == $slug][0]{
      bannerImage
    }
  `
  return client.fetch(query, { slug })
}