import {defineField, defineType} from 'sanity'
import GradientSelector from '../components/GradientSelector'

export default defineType({
  name: 'bigProject',
  title: 'Big Project',
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
      type: 'string',
    }),
    defineField({
      name: 'patch',
      title: 'Patch',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gradientColors',
      title: 'Gradient Colors',
      type: 'array',
      of: [{type: 'string'}],
      components: {input: GradientSelector},
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'largeQuote' },
        { type: 'largeImage' },
        { type: 'spanningText' },
        { type: 'doubleImage' },
        { type: 'doubleImageCollage'},
        { type: 'bannerImage'}
      ],
    }),
  ],
})
