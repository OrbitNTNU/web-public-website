import {defineType, defineField} from 'sanity'
import {MdArticle} from 'react-icons/md'

export default defineType({
  name: 'articleReference',
  title: 'Articles!',
  type: 'object',
  icon: MdArticle,
  fields: [
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'article'}],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],

  preview: {
    select: {
      articles: 'articles',
    },
    prepare({articles}) {
      const count = articles?.length || 0
      return {
        title: `Article Group`,
        subtitle: `${count} article${count !== 1 ? 's' : ''}`,
        media: MdArticle,
      }
    },
  },
})
