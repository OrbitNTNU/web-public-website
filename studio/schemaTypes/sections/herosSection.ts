import {defineField, defineType} from 'sanity'

// heroSection.js
export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      type: 'string',
      title: 'Subtitle',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      title: 'Background Image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'video',
      type: 'url',
      title: 'Background Video (optional)',
    }),
  ],
})
