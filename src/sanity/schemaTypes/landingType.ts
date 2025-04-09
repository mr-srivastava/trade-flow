import { defineField, defineType } from "sanity";

export const landingType = defineType({
  name: "landing",
  title: "Landing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryButton",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryButtonLink",
      type: "url",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryButton",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "secondaryButtonLink",
      type: "url",
      validation: (rule) => rule.required(),
    }),
  ],
});
