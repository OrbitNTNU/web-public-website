import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectsShowcase',
  title: 'Projects Showcase',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Title of the projects showcase section',
    }),
    defineField({
      name: 'bigProjects',
      title: 'Big Projects',
      type: 'array',
      description: 'List of big projects in the order you want them to appear',
      of: [
        { type: 'reference', to: [{ type: 'bigProject' }] }, // reference to bigProject
      ],
      options: {
        sortable: true, // Allows manual reordering
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one project must be selected')
          .custom((projects) => {
            if (!projects) return true; // handled by required
            const ids = projects.map((p) => p._ref || p._id) // get the reference ID
            const uniqueIds = Array.from(new Set(ids))
            return ids.length === uniqueIds.length || 'Each project must be unique'
          }),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Projects Showcase',
      }
    },
  },
})
