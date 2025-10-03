import {defineType, defineField} from 'sanity'
import TeamsSelector from '../components/TeamsSelector'
import {getTeamNames} from '../utils/teamNames'

const teamNames = await getTeamNames()

export default defineType({
  name: 'team',
  title: 'Teams',
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
        Rule.unique().custom(async (teams, context) => {
          if (!teams || teams.length === 0) return true
          const client = context.getClient({apiVersion: '2023-01-01'})
          const docId = context.document?._id
          for (const team of teams) {
            const existing = await client.fetch(
              `*[_type == "team" && $team in teams && _id != $docId][0]`,
              {team, docId},
            )
            if (existing) {
              return `A document for team ${team} already exists.`
            }
          }
          return true
        }),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-generated based on selected team',
      options: {
        source: (doc) => {
          const names = (doc.team as string[] || [])
            .map((id: string) => teamNames.find((team) => team.id === id)?.name)
            .filter(Boolean)
          return names.join('-')
        },
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // spaces to dashes
            .replace(/[^a-z0-9-]/g, '') // remove invalid chars
            .replace(/--+/g, '-') // collapse multiple dashes
            .trim(),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Page Content',
      description: 'Build a custom page with sections (text, media, layouts, etc.)',
      type: 'array',
      of: [
        {type: 'heroSection'},
        {type: 'textSection'},
        {type: 'imageSection'},
        {type: 'videoSection'},
        {type: 'gallerySection'},
        {type: 'ctaSection'},
        {type: 'customBlock'},
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
