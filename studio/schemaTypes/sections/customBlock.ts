import { defineField, defineType } from "sanity";

export default defineType({
  name: 'customBlock',
  title: 'Custom Content',
  type: 'object',
  fields: [
    defineField({
      name: 'body',
      title: 'Custom Rich Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'image', options: {hotspot: true}},
        {type: 'file'},
      ],
    }),
  ],
})
