import {defineField, defineType} from 'sanity'
import TeamsSelector from '../../components/TeamsSelector'

export default defineType({
  name: 'joinPage',
  title: 'Join page',
  type: 'document',
  fields: [
    defineField({
      name: 'placeholder',
      type: 'string',
      hidden: true,
      initialValue: '',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.max(4).error('You can only add up to 4 images'),
    }),

    defineField({
      name: 'applyLink',
      title: 'General Apply Link',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
    defineField({
      name: 'components',
      title: 'Components',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'joinComponent',
          title: 'Join Component',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              fields: [
                defineField({
                  name: 'alt',
                  title: 'Alt Text',
                  type: 'string',
                  validation: (Rule) => Rule.required(),
                }),
              ],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'header',
              title: 'Header',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'team',
              title: 'Which Team?',
              description:
                'Select the teams this document applies to. If no team is selected, the document will not be applied to any teams.',
              type: 'array',
              of: [{type: 'number'}],
              components: {
                input: TeamsSelector,
              },
              validation: (Rule) =>
                Rule.warning(
                  'If no team is selected, this document will not be grouped under any team.',
                ),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [{type: 'block'}],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'header',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Join Section',
        subtitle: 'Join card configuration',
      }
    },
  },
})
