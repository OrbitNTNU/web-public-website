import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'forSponsorsCard',
  title: 'For Sponsors Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Main Title',
      type: 'string',
      initialValue: 'Partner with Us',
    }),
    defineField({
      name: 'intro',
      title: 'Intro Paragraph',
      type: 'text',
      rows: 4,
      description: 'Short description about sponsorship opportunities',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'CTA Buttons',
      type: 'array',
      of: [
        defineField({
          name: 'cta',
          title: 'CTA',
          type: 'object',
          fields: [
            {name: 'text', title: 'Button Text', type: 'string'},
            {name: 'url', title: 'Link', type: 'string'},
            {
              name: 'color',
              title: 'Button Color Class',
              type: 'string',
              description: "Tailwind class like 'bg-emerald-fizz' or 'bg-pink-blast'",
            },
            {
              name: 'hoverColor',
              title: 'Button Hover Color Class',
              type: 'string',
              description: "Tailwind class like 'bg-emerald-fizz' or 'bg-pink-blast'",
            },
            {
              name: 'textColor',
              title: 'Text Color Class',
              type: 'string',
              description: "Tailwind text color like 'text-cloud-white'",
            },
          ],
        }),
      ],
    }),
  ],
})
