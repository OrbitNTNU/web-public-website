import {defineField, defineType} from 'sanity';

export default defineType({
    name: 'timelineSection',
    title: 'Timeline Section',
    type: 'object',
    fields: [
        defineField({
            name: 'heading',
            title: 'Heading',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subheading',
            title: 'Subheading',
            type: 'string',
            initialValue: ''
        }),
        defineField({
            name: 'placeholder',
            title: 'Placeholder',
            type: 'string',
            hidden: true, // hide it from the editor
            initialValue: '', // optional
        })
    ],
    preview: {
        select: {},
        prepare() {
            return {
                title: 'Timeline Section',
                subtitle: 'A section for displaying a timeline of events',
            }
        }
    }
})