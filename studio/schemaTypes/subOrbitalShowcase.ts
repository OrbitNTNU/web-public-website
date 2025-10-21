import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'subOrbitalShowcase',
    title: 'SubOrbital Showcase',
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
                title: 'Sub Orbital projects go here',
                subtitle: 'This is a placeholder for the projects showcase section',
            }
        },
    },
})
