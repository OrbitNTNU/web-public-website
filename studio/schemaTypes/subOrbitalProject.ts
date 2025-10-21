import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'subOrbitalProject',
  title: 'Sub Orbital Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
        name: 'patch',
        title: 'Patch',
        type: 'image',
        options: {
          hotspot: true, // allows focal point selection
        },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'launchYear',
      title: 'Launch Year',
      type: 'number',
      validation: (Rule) =>
        Rule.required()
          .min(2000)
          .max(new Date().getFullYear() + 5),
    }),
  ],
})
