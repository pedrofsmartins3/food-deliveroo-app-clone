export default {
  name: "restaurants",
  title: "Restaurants",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restaurant name",
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: rule => rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "Image of the Restaurant",
    },
    {
      name: "lat",
      type: "number",
      title: "Latitude of the Restaurant",
    },
    {
      name: "long",
      type: "number",
      title: "Longitude of the Restaurant",
    },
    {
      name: "adress",
      type: "string",
      title: "Restaurant address",
    },
    {
      name: "rating",
      type: "number",
      title: "Enter a Rating from (1-5 Stars)",
      validation: rule => 
        rule.min(1)
        .max(5)
        .error("Please enter a Value between 1 and 5"),
    },
    {
      name: "type",
      title: "Category",
      type: "reference",
      to: [{ type: "category"}]
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{ type: "reference", to: [{ type: "dish" }] }],
    },
  ],
}
