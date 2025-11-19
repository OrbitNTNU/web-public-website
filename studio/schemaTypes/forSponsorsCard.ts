import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'forSponsorsCard',
  title: 'For Sponsors Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Partner with Us',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      description: 'Short description about sponsorship opportunities',
    }),
  ],
})
