import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'sdgSection',
  title: 'SDG Section',
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
        title: 'SDG Section',
        subtitle: 'Placeholder for SDG section',
      }
    },
  },
})
