import { defineField, defineType } from "sanity";

export default defineType({
  name: "article",
  title: "Article",
  type: "document",
  fields: [
    defineField({
      name: "linkType",
      title: "Article link type",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "External", value: "external" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "teaser",
      title: "Teaser",
      type: "array",
      of: [{ type: "block" }],
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      hidden: ({ document }) => document?.linkType === "external",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
            input
                .toLowerCase()
                .replace(/\s+/g, "-")
                .replace(/[^a-z0-9-]/g, "")
                .slice(0, 96),
      },
      validation: (Rule) =>
          Rule.custom((value, context) => {
            if (context.document?.linkType === "external" && value) {
              return "Slug is not allowed for external articles";
            }
            if (context.document?.linkType === "internal" && !value) {
              return "Slug is required for internal articles";
            }
            return true;
          }),
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "link",
      title: "Article link",
      type: "object",
      fields: [
        defineField({
          name: "internal",
          title: "Internal link",
          type: "reference",
          to: [{ type: "article" }],
          hidden: ({ document }) => document?.linkType !== "internal",
        }),
        defineField({
          name: "external",
          title: "External URL",
          type: "url",
          hidden: ({ document }) => document?.linkType !== "external",
        }),
      ],
      validation: (Rule) =>
          Rule.custom((value, context) => {
            if (context.document?.linkType === "external" && !value?.external) {
              return "External URL is required for external articles";
            }
            return true;
          }),
    }),
  defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      hidden: ({ document }) => document?.linkType === "external",
      of: [
        { type: "largeQuote" },
        { type: "largeImage" },
        { type: "spanningText" },
        { type: "doubleImage" },
        { type: "doubleImageCollage" },
        { type: "imageAndCaption" },
        { type: "singleImageCollage" },
        { type: "triImageCollage" },
        { type: "textHeavy" },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      date: "publishedAt",
    },
    prepare({ title, media, date }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : "No date set",
        media,
      };
    },
  },
});
