import {defineType} from 'sanity'

export default defineType({
  name: 'partnerSponsor',
  title: 'Partner Sponsor',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website URL',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'logo',
    },
  },
})
