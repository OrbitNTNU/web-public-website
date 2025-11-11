import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'teamPage',
    title: 'Team page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {source: 'title', maxLength: 96},
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {type: 'membersSection'},
                { type: 'largeQuote' },
                { type: 'largeImage' },
                { type: 'doubleImageCollage' },
                {type: 'doubleImageWide'},
                {type: 'singleImageCollage'},
                {type: 'triImageCollage'},
                {type: 'flowingTriImageCollage'},
                {type: 'articleReference'},
                {type: 'gallery'},

            ],
        }),
    ],
})
