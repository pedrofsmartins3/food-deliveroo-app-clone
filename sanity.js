import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'
import ImageUrlBuilder from "@sanity/image-url"

export const client = createClient({
    projectId: '81sg1jis',
    dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2024-02-25', // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

const builder = ImageUrlBuilder(client)
export const urlFor = (source) => builder.image(source);