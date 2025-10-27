import {MdHome, MdGroups, MdAddChart} from 'react-icons/md'
import {StructureBuilder} from 'sanity/structure'

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Landing Page
      S.listItem()
        .title('Landing Page')
        .icon(MdHome)
        .child(S.document().schemaType('landingPage').documentId('landingPage')),

      S.listItem()
        .title('Sponsors Page')
        .icon(MdHome)
        .child(S.document().schemaType('sponsorsPage').documentId('sponsorsPage')),

      S.divider().title('General Information'),
      // Teams
      S.listItem()
        .title('Teams')
        .icon(MdGroups)
        .child(S.documentTypeList('team').title('All Teams')),

      // Projects
      S.listItem()
        .title('Projects')
        .icon(MdAddChart)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('Sub Orbital Projects')
                .schemaType('subOrbitalProject')
                .child(S.documentTypeList('subOrbitalProject').title('Sub Orbital Projects')),

              S.listItem()
                .title('Big Projects')
                .schemaType('bigProject')
                .child(S.documentTypeList('bigProject').title('Big Projects')),
            ]),
        ),
      S.divider().title('Shared Components'),
     S.listItem()
        .title('Join Card')
        .child(
          S.document()
            .schemaType('joinCard')
            .documentId('singleton-joinCard') // fixed ID ensures singleton
        ),

      // Singleton: For Sponsors Card
      S.listItem()
        .title('For Sponsors Card')
        .child(
          S.document()
            .schemaType('forSponsorsCard')
            .documentId('singleton-forSponsorsCard')
        ),
    ]);
