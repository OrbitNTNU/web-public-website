import { defineType, defineField } from "sanity";

export default defineType({
  name: 'bannerImage',
  title: 'Banner Image',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    }),
  ],
  preview: {
    select: {
      image: 'image',
    },
    prepare({ image }) {
      return {
        title: 'Banner Image',
        media: image,
      };
    },
  },
})