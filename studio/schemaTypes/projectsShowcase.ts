import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'projectsShowcase',
    title: 'Projects Showcase',
    type: 'object',
    fields: [
        defineField({
            name: 'placeholder',
            title: 'Placeholder',
            type: 'string',
            description: 'This is a placeholder field. You can add fields here later as needed.',
            initialValue: 'This is a placeholder for the projects showcase section',
            readOnly: true,
        }),
    ],
    preview: {
        prepare() {
            return {
                title: 'Projects go here',
                subtitle: 'This is a placeholder for the projects showcase section',
            }
        },
    },
})
