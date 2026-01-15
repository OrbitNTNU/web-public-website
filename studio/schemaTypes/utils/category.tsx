import React from 'react'
import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'category',
    title: 'Category',
    type: 'document',

    fields: [
        defineField({
            name: 'title',
            title: 'Category name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),

        defineField({
            name: 'color',
            title: 'Category color',
            type: 'string',
            options: {
                list: [
                    {title: 'Night Sky', value: '#132940'},
                    {title: 'Moonlight', value: '#142036'},
                    {title: 'Emerald Fizz', value: '#2ecc71'},
                    {title: 'Dark Emerald', value: '#145a32'},
                    {title: 'Pink Blast', value: '#ff4f81'},
                    {title: 'Dark Pink', value: '#8b0032'},
                    {title: 'Sky Mint', value: '#48c9b0'},
                    {title: 'Dark Mint', value: '#145c52'},
                    {title: 'Laser Lemon', value: '#fff44f'},
                    {title: 'Orange Sherbert', value: '#ffb347'},
                    {title: 'Dark Lemon', value: '#665c00'},
                    {title: 'Cloud White', value: '#f5f5f5'},
                    {title: 'Dark Gray', value: '#333333'},
                    {title: 'Strong White', value: '#ffffff'},
                    {title: 'Cream', value: '#fdf6e3'},
                    {title: 'Slate', value: '#708090'},
                    {title: 'Muted Gray', value: '#a0a0a0'},
                    {title: 'Berry Blast', value: '#2897e0'},
                    {title: 'Musty Mangrove', value: '#104859'},
                    {title: 'Charcoal', value: '#111113'},
                    {title: 'Charcoal Light', value: '#aeaeae'},
                ],
            },
            validation: (Rule) => Rule.required(),
        }),
    ],

    preview: {
        select: {
            title: 'title',
            color: 'color',
        },
        prepare({title, color}) {
            return {
                title,
                subtitle: color,
                media: (
                    <span
                        style={{
                            display: 'inline-block',
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: color,
                            border: '1px solid #ccc',
                        }}
                    />
                ),
            }
        },
    },
})
