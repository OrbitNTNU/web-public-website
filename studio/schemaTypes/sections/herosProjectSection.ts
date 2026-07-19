import { defineField, defineType } from 'sanity'

export default defineType ({
    name: 'herosProjectSection',
    title: 'Heros Project Section',
    type: 'object',
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'subtitle',
            type: 'string',
            title: 'Subtitle',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectImageDesktop',
            type: 'image',
            title: 'Project Image (Desktop)',
            options: {hotspot: true},
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'projectImageMobile',
            type: 'image',
            title: 'Project Image (Mobile)',
            options: {hotspot: true},
            validation: (Rule) => Rule.required(),
        }),
    ],
    preview: {
        select: {
            title: 'title',
            subtitle: 'subtitle',
            projectImageDesktop: 'projectImageDesktop',
            projectImageMobile: 'projectImageMobile',
        }
    }
});