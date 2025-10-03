import { defineField, defineType } from "sanity";

export default defineType({
  name: 'gallerySection',
  title: 'Gallery Section',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),
  ],
})