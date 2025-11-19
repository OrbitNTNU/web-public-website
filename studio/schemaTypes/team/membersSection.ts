import {defineType, defineField} from 'sanity'
import {MdGroups} from 'react-icons/md'

export default defineType({
  name: 'membersSection',
  title: 'Members Section',
  type: 'object',
  icon: MdGroups,
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'boolean',
      initialValue: true,
      readOnly: true,
      hidden: true,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Members Section',
        subtitle: 'This marks where members will appear.',
      }
    },
  },
})
