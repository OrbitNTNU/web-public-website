import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'largeImage',
  title: 'Large Image',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption (optional)',
      type: 'string',
    }),
  ],
  preview: {
    select: {media: 'image', subtitle: 'caption'},
    prepare({media, subtitle}) {
      return {title: 'Large Image', media, subtitle}
    },
  },
})
