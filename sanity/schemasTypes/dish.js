export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Name of dish',
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: rule => rule.max(200),
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the dish in EUR',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    },
  ]
}
