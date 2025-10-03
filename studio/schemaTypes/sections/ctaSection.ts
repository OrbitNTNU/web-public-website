import { defineField, defineType } from "sanity";

export default defineType({
  name: 'ctaSection',
  title: 'Call To Action Section',
  type: 'object',
  fields: [
    defineField({name: 'heading', type: 'string', title: 'Heading'}),
    defineField({name: 'buttonText', type: 'string', title: 'Button Text'}),
    defineField({name: 'buttonUrl', type: 'url', title: 'Button URL'}),
  ],
})
