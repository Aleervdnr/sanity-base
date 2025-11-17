import { defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";

export const gridType = defineType({
  name: "grid",
  type: "object",
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Optional title for the grid section",
    }),
    defineField({
      name: "columns",
      title: "Number of Columns",
      type: "number",
      validation: (Rule) => Rule.required().min(1).max(6),
      initialValue: 3,
      description: "Number of columns in the grid (1-6)",
    }),
    defineField({
      name: "items",
      title: "Grid Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              media: "image",
            },
            prepare({ title, media }) {
              return {
                title: title || "Untitled item",
                media: media,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: "gap",
      title: "Gap Size",
      type: "string",
      options: {
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
        layout: "radio",
      },
      initialValue: "medium",
      description: "Space between grid items",
    }),
  ],
  preview: {
    select: {
      title: "title",
      columns: "columns",
      itemsCount: "items.length",
    },
    prepare({ title, columns, itemsCount }) {
      return {
        title: title || "Grid",
        subtitle: `${columns} columns, ${itemsCount || 0} items`,
        media: BlockElementIcon,
      };
    },
  },
});
