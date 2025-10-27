import { defineField, defineType } from "sanity";

export default defineType({
  name: "joinCard",
  title: "Join Card",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Main Title",
      type: "string",
      description: "Main heading of the Join section",
    }),
    defineField({
      name: "intro",
      title: "Intro Paragraph",
      type: "text",
      rows: 4,
      description: "Brief introduction about joining Orbit NTNU",
    }),
    defineField({
      name: "disciplines",
      title: "Disciplines",
      type: "array",
      of: [
        defineField({
          name: "discipline",
          title: "Discipline",
          type: "object",
          fields: [
            { name: "icon", title: "Material Icon Name", type: "string", description: "Example: 'engineering', 'code', 'people'" },
            { name: "color", title: "Icon Color Class", type: "string", description: "Tailwind color class like 'text-berry-blast'" },
            { name: "title", title: "Title", type: "string" },
            { name: "desc", title: "Description", type: "text" },
          ],
        }),
      ],
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      of: [
        defineField({
          name: "benefit",
          title: "Benefit",
          type: "object",
          fields: [
            { name: "icon", title: "Material Icon Name", type: "string" },
            { name: "color", title: "Icon Color Class", type: "string" },
            { name: "title", title: "Title", type: "string" },
            { name: "desc", title: "Description", type: "text" },
          ],
        }),
      ],
    }),
    defineField({
      name: "ctaText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Learn More & Apply",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA Link",
      type: "string",
      initialValue: "/join",
    }),
  ],
});
