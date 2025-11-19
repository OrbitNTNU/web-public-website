import {MdHome, MdGroups, MdAddChart, MdArticle} from 'react-icons/md'
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

            // About Page
            S.listItem()
                .title('About Page')
                .icon(MdHome)
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),

            // Sponsors Page
            S.listItem()
                .title('Sponsors Page')
                .icon(MdHome)
                .child(S.document().schemaType('sponsorsPage').documentId('sponsorsPage')),

            S.divider().title('General Information'),

            // Teams
            S.listItem()
                .title('Teams')
                .icon(MdGroups)
                .child(
                    S.list()
                        .title('Teams')
                        .items([
                            S.listItem()
                                .title('Teams Page Settings')
                                .child(
                                    S.document()
                                        .schemaType('teamPage')
                                        .documentId('teamPage')
                                ),
                            // FIX: team → teamPage
                            S.documentTypeListItem('teamPage')
                                .title('All Team Pages'),
                        ])
                ),

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
                                .child(S.documentTypeList('subOrbitalProject').title('Sub Orbital Projects')),
                            S.listItem()
                                .title('Big Projects')
                                .child(S.documentTypeList('bigProject').title('Big Projects')),
                        ])
                ),

            S.divider().title('Articles'),

            // Articles grouped manually by year
            S.listItem()
                .title('Articles')
                .icon(MdArticle)
                .child(
                    S.list()
                        .title('Articles by Year')
                        .items([
                            S.listItem()
                                .title('All Articles')
                                .child(S.documentTypeList('article').title('All Articles')),
                            S.divider(),
                            S.listItem()
                                .title('2026')
                                .child(
                                    S.documentTypeList('article')
                                        .title('Articles from 2026')
                                        .filter(`_type == "article" && publishedAt match "^2026"`)
                                ),
                            S.listItem()
                                .title('2025')
                                .child(
                                    S.documentTypeList('article')
                                        .title('Articles from 2025')
                                        .filter(`_type == "article" && publishedAt match "^2025"`)
                                ),
                            S.divider(),
                            S.listItem()
                                .title('Drafts')
                                .child(
                                    S.documentTypeList('article')
                                        .title('Unpublished Articles')
                                        .filter('_type == "article" && !defined(publishedAt)')
                                ),
                        ])
                ),

            S.divider().title('Shared Components'),

            S.listItem()
                .title('Join Card')
                .child(S.document().schemaType('joinCard').documentId('singleton-joinCard')),

            S.listItem()
                .title('For Sponsors Card')
                .child(S.document().schemaType('forSponsorsCard').documentId('singleton-forSponsorsCard')),

            // All documents folder
            S.divider().title('All Documents'),
            S.listItem()
                .title('All Documents')
                .child(
                    S.list()
                        .title('All Documents')
                        .items(S.documentTypeListItems())
                ),
        ])
