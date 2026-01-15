import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'teaser',
      title: 'Teaser',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // genereres automatisk basert på tittel
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-') // mellomrom til bindestrek
            .replace(/[^a-z0-9-]/g, '') // fjern ugyldige tegn
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Article link type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Article link',
      type: 'object',
      fields: [
        defineField({
          name: 'internal',
          title: 'Internal link',
          type: 'reference',
          to: [{type: 'article'}],
          hidden: ({document}) => document?.linkType !== 'internal',
        }),

        defineField({
          name: 'external',
          title: 'External URL',
          type: 'url',
          hidden: ({document}) => document?.linkType !== 'external',
        }),
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      hidden: ({document}) => document?.linkType === 'external',
      of: [
        {type: 'largeQuote'},
        {type: 'largeImage'},
        {type: 'spanningText'},
        {type: 'doubleImage'},
        {type: 'doubleImageCollage'},
        {type: 'imageAndCaption'},
        {type: 'singleImageCollage'},
        {type: 'triImageCollage'},
        {type: 'textHeavy'},
      ],
    }),

  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      date: 'publishedAt',
    },
    prepare({title, media, date}) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
        media,
      }
    },
  },
})
