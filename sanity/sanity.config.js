import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemasTypes'

export default defineConfig({
  name: 'default',
  title: 'food-deliveroo-app-clone',

  projectId: '81sg1jis',
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
