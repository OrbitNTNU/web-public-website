import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'singleImageCollage',
  title: 'Single Image Collage',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Single Image Items',
      type: 'array',
      of: [{type: 'imageAndCaption'}],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      items: 'items',
    },
    prepare({title, items}) {
      const count = items ? items.length : 0
      return {
        title: title || `Single Image Collage`,
        subtitle: `${count} item${count === 1 ? '' : 's'}`,
      }
    },
  },
})
