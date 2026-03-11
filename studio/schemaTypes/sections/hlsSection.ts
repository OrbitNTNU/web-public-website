import {defineType, defineField} from 'sanity'
import GradientSelctor from '../../components/GradientSelector'
import GradientSelector from "../../components/GradientSelector";
export default defineType({
    name: 'hlsSection',
    title: 'High Level Spesifications Section',
    type: "object",
    fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "hls",
          title: "High Level Specifications",
          type: "array",
          of: [{
              name: "hlsItem",
              title: "HLS Item",
              type: "object",
              fields: [
                  defineField({
                      name: "hlsHeader",
                      title: "HLS Header",
                      type: "string",
                      validation: (Rule) => Rule.required()
                  }),
                  defineField({
                      name: "hlsBody",
                      title: "HLS Body",
                      type: "string"
                  }),
                  defineField({
                      name: 'gradientColors',
                      title: 'Gradient Colors',
                      type: 'array',
                      of: [{type: 'string'}],
                      components: {input: GradientSelector},
                  }),
              ],
          }],
          validation: (Rule) => Rule.required().min(1),
        }),
    ],
});