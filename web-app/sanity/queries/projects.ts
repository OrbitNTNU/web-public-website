import { client } from "../config"
import { BigProject } from "../types/project"

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

export async function fetchBigProjectBySlug(slug: string): Promise<BigProject | null> {
  const query = `
    *[_type == "bigProject" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      teaser,
      "slug": slug,
      patch,
      gradientColors,
      sections[]
    }
  `

  return client.fetch(query, { slug })
}
