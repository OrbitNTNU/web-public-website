import { defineField, defineType } from "sanity"

export default defineType({
  name: 'spanningText',
  title: 'Spanning Text',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Full-Width Text',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: 'text' },
    prepare({ title }) {
      return {
        title: 'Spanning Text',
        subtitle: title?.length > 80 ? title.slice(0, 80) + '…' : title,
      };
    },
  },
});