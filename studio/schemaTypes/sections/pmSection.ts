import {defineType, defineField} from 'sanity'

export default defineType({
    name: "pmSection",
    title: "PM Section",
    type: "object",
    fields: [
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "body",
            title: "Body",
            type: "array",
            of: [{type: "block"}],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "pmCardCollection",
            title: "PM Card Collection",
            type: "array",
            of: [{
                name: "pmCard",
                title: "PM Card",
                type: "object",
                fields: [
                    defineField({
                        name: "pmImage",
                        title: "PM Image",
                        type: "image",
                        options: {hotspot: true},
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: "pmName",
                        title: "PM Name",
                        type: "string",
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: "pmPeriodStart",
                        title: "PM Period Start",
                        type: "datetime",
                        initialValue: () => new Date().toISOString(),
                        validation: (Rule) => Rule.required()
                    }),
                    defineField({
                        name: "pmPeriod",
                        title: "PM Period End",
                        type: "datetime",
                    }),
                ],
                validation: (Rule) => Rule.required(),
            }],
        }),
    ],
    preview: {
        select: {
            title: "title",
            body: "body",
            pmCardCollection: "pmCardCollection",
        },
        prepare(selection) {
            const {title, body, pmCardCollection} = selection;
            const pmNames = pmCardCollection?.map((card: any) => card.pmName).join(", ");
            return {
                title: title,
                body: `${body ? body[0].children[0].text : ""}${pmNames ? ` - PMs: ${pmNames}` : ""}`,
                pmCardCollection: pmCardCollection,
            };
        }
    }
})