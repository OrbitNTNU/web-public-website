export default {
  name: 'triImageCollage',
  title: 'Tri Image Collage',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the collage',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Optional caption for the collage',
    },
    {
      name: 'src1',
      title: 'Image 1',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt1',
      title: 'Alt Text 1',
      type: 'string',
      description: 'Accessibility text for image 1',
    },
    {
      name: 'src2',
      title: 'Image 2',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt2',
      title: 'Alt Text 2',
      type: 'string',
      description: 'Accessibility text for image 2',
    },
    {
      name: 'src3',
      title: 'Image 3',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'alt3',
      title: 'Alt Text 3',
      type: 'string',
      description: 'Accessibility text for image 3',
    },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'Layout variant of the collage',
      options: {
        list: [
          {title: 'Large Left', value: 'large-left'},
          {title: 'Large Right', value: 'large-right'},
        ],
        layout: 'radio',
      },
      initialValue: 'large-left',
    },
    {
      name: 'wideCaption',
      title: 'Wide Caption',
      type: 'boolean',
      description: 'If true, the caption spans the full width',
      initialValue: false,
    },
  ],
}
