import { defineQuery } from "groq";

export const SPONSORS_PAGE_QUERY = defineQuery(`
  *[
    _type == "sponsorsPage" &&
    !(_id in path("drafts.**"))
  ][0]{
    _id,
    title,
    caption,
    "mainSponsors": mainSponsors[] {
      _key,
      name,
      logo { ..., asset-> },
      website,
      description[],
      imageWithUs { ..., asset-> }
    },
    "platinumSponsors": platinumSponsors[] {
      _key,
      name,
      logo { ..., asset-> },
      website,
      description[],
      imageWithUs { ..., asset-> }
    },
    "goldSponsors": goldSponsors[] {
      _key,
      name,
      logo { ..., asset-> },
      website,
      description[],
      imageWithUs { ..., asset-> }
    },
    "silverSponsors": silverSponsors[] {
      _key,
      name,
      logo { ..., asset-> },
      website,
      description[]
    },
    "bronzeSponsors": bronzeSponsors[] {
      _key,
      name,
      logo { ..., asset-> },
      website
    },
    "partners": partners[] {
      _key,
      name,
      logo { ..., asset-> },
      website
    }
  }
`);
