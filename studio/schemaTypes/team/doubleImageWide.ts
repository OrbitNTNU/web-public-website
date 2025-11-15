import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'doubleImageWide',
  title: 'Double Image Wide',
  type: 'object',
  fields: [
    defineField({
      name: 'variant',
      title: 'Layout Variant',
      type: 'string',
    }),
    defineField({
      name: 'image1',
      title: 'First Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'alt1', title: 'Alt Text (Image 1)', type: 'string'}),
    defineField({name: 'title1', title: 'Title (Image 1)', type: 'string'}),
    defineField({name: 'caption1', title: 'Caption (Image 1)', type: 'text', rows: 4}),
    defineField({name: 'link1', title: 'Link (Image 1)', type: 'string'}),
    defineField({
      name: 'image2',
      title: 'Second Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'alt2', title: 'Alt Text (Image 2)', type: 'string'}),
    defineField({name: 'title2', title: 'Title (Image 2)', type: 'string'}),
    defineField({name: 'caption2', title: 'Caption (Image 2)', type: 'text', rows: 4}),
    defineField({name: 'link2', title: 'Link (Image 2)', type: 'string'}),
  ],
  preview: {
    select: {
      media1: 'image1',
      media2: 'image2',
      variant: 'variant',
    },
    prepare({media1, media2, variant}) {
      return {
        title: `Double Image Wide (${variant})`,
        subtitle: variant,
        media: media1 || media2,
      }
    },
  },
})
