import {defineType, defineField} from 'sanity'
import {MdLink} from 'react-icons/md'

export default defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: MdLink,
  fields: [
    defineField({
      name: 'type',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'internal'},
          {title: 'External', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'external',
    }),

    defineField({
      name: 'internal',
      title: 'Internal Link',
      type: 'reference',
      to: [
        {type: 'article'},
        {type: 'teamPage'},
        {type: 'landingPage'},
        {type: 'aboutPage'},
        {type: 'sponsorsPage'},
      ], //Legg til når individuelle teams er mer definert
      hidden: ({parent}) => parent?.type !== 'internal',
    }),

    defineField({
      name: 'external',
      title: 'External URL',
      type: 'url',
      hidden: ({parent}) => parent?.type !== 'external',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: false,
          scheme: ['http', 'https'],
        }),
    }),
  ],
})
