import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'joinCard',
  title: 'Join Card',
  type: 'document',
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
        title: 'Join Section',
        subtitle: 'Placeholder for Join section',
      }
    },
  },
})
