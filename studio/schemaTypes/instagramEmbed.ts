import { defineType, defineField } from "sanity";

export default defineType({
  name: 'instagramEmbed',
  title: 'Instagram Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
      hidden: true, // hide it from the editor
      initialValue: '', // optional
    }),
  ],
  preview: {
    select: {},
    prepare() {
      return {
        title: 'Instagram Embed',
        subtitle: 'Placeholder for Instagram embed',
      };
    },
  },
});
