import { MdHome, MdGroups, MdAddChart } from 'react-icons/md'
import { StructureBuilder } from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Landing Page
      S.listItem()
        .title('Landing Page')
        .icon(MdHome)
        .child(
          S.document()
            .schemaType('landingPage')
            .documentId('landingPage')
        ),

      // Teams
      S.listItem()
        .title('Teams')
        .icon(MdGroups)
        .child(S.documentTypeList('team').title('All Teams')),

      // Projects
      S.listItem()
        .title('Projects')
        .icon(MdAddChart)
    ])
