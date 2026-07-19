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
            name: 'timelineCollection',
            title: 'Timeline Cards',
            type: 'array',
            of: [{
                name: 'timelineCard',
                title: 'Timeline Card',
                type: 'object',
                fields: [
                    defineField({
                        name: 'imageTitle',
                        title: 'Image Title',
                        type: 'string',
                        validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                        name: 'imageDescription',
                        title: 'Image Description',
                        type: 'array',
                        of: [{type: 'block'}],
                    }),
                    defineField({
                        name: 'image',
                        title: 'Image',
                        type: 'image',
                        validation: (Rule) => Rule.required(),
                    }),
                ],
                preview: {
                    select: {
                        title: 'imageTitle',
                        description: 'imageDescription',
                        media: 'image',
                    }
                },
            }],

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
        select: {
            title: 'heading',
            subheading: 'subheading',
            collection: 'timelineCollection',
        },
    }
})