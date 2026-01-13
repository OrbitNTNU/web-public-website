import { defineQuery } from "groq";

export const JOIN_PAGE_QUERY = defineQuery(`
  *[
    _type == "joinPage" &&
    !(_id in path("drafts.**"))
  ][0]{
    _id,

    images[]{
      asset->{
        _id,
        url,
        metadata {
          dimensions
        }
      },
      alt
    },

    components[]{
      header,
      description,

      image{
        asset->{
          _id,
          url,
          metadata {
            dimensions
          }
        },
        alt
      },

      button{
        label,
        href
      }
    }
  }
`);
