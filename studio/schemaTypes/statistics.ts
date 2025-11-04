import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'statistics',
  title: 'Statistics',
  type: 'object',
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: true, // hide it from the editor
      initialValue: '', // optional
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Statistics Section',
        subtitle: 'Placeholder for statistics section',
      }
    },
  },
})
