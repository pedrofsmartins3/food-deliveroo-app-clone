export default {
  name: 'featured',
  title: 'Featured Menu categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Category name',
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: rule => rule.max(200),
    },
    {
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{ type: "reference", to: [{ type: "restaurants"}] }],
    },
  ]
}
