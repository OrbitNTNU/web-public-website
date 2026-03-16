import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'otSection',
    title: 'Operations Timeline Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'array',
            of: [{type: 'block'}],
        }),
        defineField({
            name: 'placeholder',
            title: 'Placeholder',
            type: 'string',
            hidden: true,
            initialValue: '',
        }),
    ],
    preview: {
        select: {},
        prepare() {
            return {
                title: 'Operations Timeline Section',
                subtitle: 'A section for displaying a timeline of events',
            }
        }
    }
})