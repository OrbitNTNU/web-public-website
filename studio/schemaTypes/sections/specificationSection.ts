import {defineType, defineField} from 'sanity'

export default defineType({
    name: 'specificationSection',
    title: 'Specification Section',
    type: 'document',
    fields: [
        defineField({
            name: 'graphic',
            title: 'Graphic URL',
            type: 'url',
            validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
        }),
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'specifications',
            title: 'Specifications',
            type: 'array',
            of: [
                {
                    name: 'specificationItem',
                    title: 'Specification',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                        defineField({
                            name: 'value',
                            title: 'Value',
                            type: 'string',
                            validation: (Rule) => Rule.required(),
                        }),
                    ],
                    preview: {
                        select: {title: 'label', subtitle: 'value'},
                    },
                },
            ],
            validation: (Rule) => Rule.min(1),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'graphic',
        },
    },
})
