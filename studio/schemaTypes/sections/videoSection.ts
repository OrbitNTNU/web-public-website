import { defineField, defineType } from "sanity";

export default defineType({
  name: 'videoSection',
  title: 'Video Section',
  type: 'object',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'url', type: 'url', title: 'Video URL'}),
    defineField({name: 'autoplay', type: 'boolean', title: 'Autoplay'}),
  ],
})