import {defineType, defineField} from 'sanity'
import {MdPhotoLibrary} from 'react-icons/md'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'object',
  icon: MdPhotoLibrary,
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          name: 'galleryItem',
          title: 'Gallery Item',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              validation: (Rule) => Rule.required().warning('Accessibility requires alt text.'),
            }),
            defineField({
              name: 'tagline',
              title: 'Tagline!',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Optional Link',
              type: 'link',
            }),
          ],
          preview: {
            select: {media: 'image', title: 'alt', subtitle: 'description'},
          },
        }),
      ],
      validation: (Rule) => Rule.max(20),
    }),
  ],
  preview: {
    select: {
      images: 'images',
    },
    prepare({images}) {
      const count = images?.length || 0
      return {
        title: `Image Gallery`,
        subtitle: `${count} image${count === 1 ? '' : 's'}`,
      }
    },
  },
})
