import { defineField, defineType } from "sanity"

export default defineType({
  name: 'largeQuote',
  title: 'Large Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'quote'},
    prepare({title}) {
      return {
        title: 'Large Quote',
        subtitle: title?.length > 80 ? title.slice(0, 80) + '…' : title,
      }
    },
  },
})
