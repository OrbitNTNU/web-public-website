import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'tslSection',
    title: 'Time Since Launch Section',
    type: 'object',
    fields: [
        defineField({
           name: 'lastLaunchDate',
           title: 'Last Launch Date',
           type: 'Date',
        }),
    ],
});