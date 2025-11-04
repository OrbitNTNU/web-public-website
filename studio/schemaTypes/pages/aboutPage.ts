import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
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
        {type: 'triImageCollage'},
        {type: 'doubleImage'},
        {type: 'doubleImageCollage'},
        {type: 'singleImageCollage'},
        {type: 'largeImage'},
        {type: 'spanningText'},
        {type: 'statistics'},
        {type: 'sdgSection'},
      ],
    }),
  ],
})
