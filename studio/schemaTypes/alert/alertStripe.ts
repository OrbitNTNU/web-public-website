import { defineType, defineField } from "sanity";
import IconPicker from "./IconPicker";

export const alertStripe = defineType({
    name: "alertStripe",
    title: "Alert Stripe",
    type: "object",
    fields: [
        defineField({
            name: "enabled",
            title: "Enabled",
            type: "boolean",
            initialValue: true,
        }),
        defineField({
            name: "title",
            title: "Title",
            type: "string",
            validation: (Rule) => Rule.required().max(30),
        }),
        defineField({
            name: "variant",
            title: "Color Variant",
            type: "string",
            options: {
                list: [
                    { title: "Laser Lemon", value: "laser-lemon" },
                    { title: "Emerald Fizz", value: "emerald-fizz" },
                    { title: "Berry Blast", value: "berry-blast" },
                    { title: "Sky Mint", value: "sky-mint" },
                ],
                layout: "radio",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "icon",
            title: "Icon",
            type: "string",
            components: {
                input: IconPicker,
            },
            initialValue: "WarningAmber",
        }),
        defineField({
            name: "content",
            title: "Content",
            type: "portableText",
            validation: (Rule) => Rule.required().max(100),
        }),
        defineField({
            name: "startDate",
            title: "Start Date",
            type: "datetime",
        }),

        defineField({
            name: "endDate",
            title: "End Date",
            type: "datetime",
        }),
    ],

    preview: {
        select: {
            title: "content.0.children.0.text",
            variant: "variant",
        },
        prepare({ title, variant }) {
            return {
                title: title || "Alert Stripe",
                subtitle: `Variant: ${variant}`,
            };
        },
    },
});
