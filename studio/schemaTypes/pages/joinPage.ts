import {defineField, defineType} from 'sanity'

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
            validation: (Rule) =>
                Rule.max(4).error('You can only add up to 4 images'),
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
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                            rows: 3,
                            validation: (Rule) => Rule.required(),
                        }),

                        defineField({
                            name: 'button',
                            title: 'Button',
                            type: 'object',
                            fields: [
                                defineField({
                                    name: 'label',
                                    title: 'Label',
                                    type: 'string',
                                    validation: (Rule) => Rule.required(),
                                }),
                                defineField({
                                    name: 'href',
                                    title: 'Link',
                                    type: 'url',
                                    validation: (Rule) =>
                                        Rule.required().uri({
                                            allowRelative: true,
                                            scheme: ['http', 'https', 'mailto', 'tel'],
                                        }),
                                }),
                            ],
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
