import {defineType} from 'sanity'

export default defineType({
  name: 'textHeavy',
  title: 'Text Heavy',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required().min(1),
    },
  ],
})
