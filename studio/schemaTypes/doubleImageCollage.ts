import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'doubleImageCollage',
  title: 'Double Image Collage',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Double Image Items',
      type: 'array',
      of: [{ type: 'doubleImage' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({ title, items }) {
      const count = items ? items.length : 0
      return {
        title: title || `Double Image Collage`,
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
