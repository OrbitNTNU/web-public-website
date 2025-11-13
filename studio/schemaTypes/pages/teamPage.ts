import {defineField, defineType} from 'sanity'
import TeamsSelector from '../../components/TeamsSelector'
import {getTeamNames} from '../../utils/teamNames'

const teamNames = await getTeamNames()

export default defineType({
  name: 'teamPage',
  title: 'Team page',
  type: 'document',
  fields: [
    defineField({
      name: 'team',
      title: 'Which Team?',
      description:
        'Select the teams this document applies to. If no team is selected, the document will not be applied to any teams.',
      type: 'array',
      of: [{type: 'number'}],
      components: {
        input: TeamsSelector,
      },
      validation: (Rule) =>
        Rule.warning().custom(async (teams, context) => {
          if (!teams || teams.length === 0) return true

          const client = context.getClient({ apiVersion: '2023-01-01' })
          const docId = context.document?._id

          // Fetch all other docs that share at least one team ID
          const existingDocs = await client.fetch(
            `*[_type == "teamPage" && _id != $docId && count((team)[@ in $teams]) > 0]{
              _id,
              title,
              team
            }`,
            { teams, docId }
          )

          if (existingDocs.length > 0) {
            const overlappingTeams = new Set<string>()

            existingDocs.forEach((doc: any) => {
              doc.team.forEach((t: number) => {
                if (teams.includes(t)) {
                  const teamName =
                    teamNames.find((team) => String(team.id) === String(t))
                      ?.name || `ID: ${t}`
                  overlappingTeams.add(teamName)
                }
              })
            })

            return `The following team(s) already have an assigned page: ${[
              ...overlappingTeams,
            ].join(', ')}`
          }

          return true
        }),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'membersSection'},
        {type: 'largeQuote'},
        {type: 'largeImage'},
        {type: 'doubleImageCollage'},
        {type: 'doubleImageWide'},
        {type: 'singleImageCollage'},
        {type: 'triImageCollage'},
        {type: 'flowingTriImageCollage'},
        {type: 'articleReference'},
        {type: 'gallery'},
      ],
    }),
  ],
  preview: {
    select: {
      teams: 'team',
    },
    prepare({teams}) {
      if (!teams || teams.length === 0) {
        return {title: 'All Teams'}
      }
      const names = teams.find((id: string) => teamNames.some((team) => team.id === id))
        ? teams.map((id: string) => teamNames.find((team) => team.id === id)?.name || `ID: ${id}`)
        : ['No matching teams']
      return {
        title: names.join(', '),
      }
    },
  },
})
