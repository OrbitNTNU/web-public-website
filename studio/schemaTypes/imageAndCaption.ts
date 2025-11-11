export default {
  name: 'imageAndCaption',
  title: 'Image and Caption',
  type: 'object',
  fields: [
    {
      name: 'src',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // allows cropping/focusing
      },
      description: 'The main image to display',
    },
    {
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Accessibility text for the image',
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the image',
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Optional caption to display under the image',
    },
    {
      name: 'wideCaption',
      title: 'Wide Caption',
      type: 'boolean',
      description: 'If true, caption spans full width',
      initialValue: false,
    },
    {
      name: 'link',
      title: 'Link',
      type: 'string',
      description: 'Optional path to wrap the image in',
    },
    {
      name: 'variant',
      title: 'Variant',
      type: 'string',
      description: 'Layout variant for the image',
      options: {
        list: [
          {title: 'Standard', value: 'standard'},
          {title: 'Large Left', value: 'large-left'},
          {title: 'Large Right', value: 'large-right'},
        ],
        layout: 'radio',
      },
      initialValue: 'standard',
    },
  ],
}
