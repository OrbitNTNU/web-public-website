import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { deskStructure } from './deskStructure'
import { schemaTypes } from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'orbitntnu-web',

  projectId: 'mt6p5031',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
