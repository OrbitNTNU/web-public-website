import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectsShowcase',
  title: 'Projects Showcase',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description:
        'Title of the projects showcase section (e.g. “SubOrbital Projects” or “Big Projects”)',
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      description: 'Choose which kind of projects this showcase should display',
      options: {
        list: [
          {title: 'Big Projects', value: 'bigProject'},
          {title: 'Sub Orbital Projects', value: 'subOrbitalProject'},
        ],
        layout: 'radio',
      },
      initialValue: 'bigProject',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projects',
      title: 'Projects',
      type: 'array',
      description: 'Select and order the projects you want to display',
      of: [
        {
          type: 'reference',
          to: [{type: 'bigProject'}, {type: 'subOrbitalProject'}],
        },
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one project must be selected')
          .custom((projects) => {
            if (!projects) return true // handled by required
            const ids = projects.map((p) => p._ref || p._id)
            const uniqueIds = Array.from(new Set(ids))
            return ids.length === uniqueIds.length || 'Each project must be unique'
          }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      projectType: 'projectType',
    },
    prepare({title, projectType}) {
      return {
        title: title || 'Projects Showcase',
        subtitle:
          projectType === 'subOrbitalProject' ? 'Sub Orbital Showcase' : 'Big Projects Showcase',
      }
    },
  },
})
