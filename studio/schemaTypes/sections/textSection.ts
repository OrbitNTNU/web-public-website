import { defineField, defineType } from "sanity";

export default defineType({
  name: 'textSection',
  title: 'Text Section',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'body', type: 'array', of: [{type: 'block'}], title: 'Body'}),
  ],
})
