import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'article',
    title: 'Article',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'teaser',
            title: 'Teaser',
            type: 'array',
            of: [{ type: 'block' }],
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title', // genereres automatisk basert på tittel
                maxLength: 96,
                slugify: (input) =>
                    input
                        .toLowerCase()
                        .replace(/\s+/g, '-') // mellomrom til bindestrek
                        .replace(/[^a-z0-9-]/g, '') // fjern ugyldige tegn
                        .slice(0, 96),
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'mainImage',
            title: 'Main Image',
            type: 'image',
            options: {
                hotspot: true,
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'publishedAt',
            title: 'Published At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'sections',
            title: 'Sections',
            type: 'array',
            of: [
                {type: 'largeQuote'},
                {type: 'largeImage'},
                {type: 'spanningText'},
                {type: 'doubleImage'},
                {type: 'doubleImageCollage'},
                {type: 'projectsShowcase'},
                {type: 'instagramEmbed'},
                {type: 'subOrbitalShowcase'},
            ],
        }),
    ],
    preview: {
        select: {
            title: 'title',
            media: 'mainImage',
            date: 'publishedAt',
        },
        prepare({title, media, date}) {
            return {
                title,
                subtitle: date ? new Date(date).toLocaleDateString() : 'No date set',
                media,
            }
        },
    },
})
