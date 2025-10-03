import { defineField, defineType } from "sanity";

export default defineType({
  name: 'imageSection',
  title: 'Image Section',
  type: 'object',
  fields: [
    defineField({
      name: 'caption', 
      type: 'string', 
      title: 'Caption',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      type: 'string',
      title: 'Image Alignment',
      options: {list: ['left', 'right', 'center']},
      validation: (Rule) => Rule.required(),
    }),
  ],
})