import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'largeQuote'},
        {type: 'largeImage'},
        {type: 'spanningText'},
        {type: 'doubleImage'},
        {type: 'doubleImageCollage'},
        {type: 'projectsShowcase'},
      ],
    }),
  ],
})
