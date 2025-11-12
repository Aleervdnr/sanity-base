import { defineField, defineType } from "sanity";
import { MenuIcon } from "@sanity/icons";

export const headerType = defineType({
  name: "header",
  title: "Header",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logoText",
      title: "Logo Text (fallback)",
      type: "string",
      description: "Texto que se mostrará si no hay logo o como alt text",
    }),
    defineField({
      name: "logoHeight",
      title: "Logo Height (px)",
      type: "number",
      description: "Altura del logo en píxeles (el ancho se ajustará automáticamente)",
      initialValue: 70,
      validation: (Rule) => Rule.required().min(20).max(200),
    }),
    defineField({
      name: "logoMaxWidth",
      title: "Logo Max Width (px)",
      type: "number",
      description: "Ancho máximo del logo en píxeles",
      initialValue: 200,
      validation: (Rule) => Rule.required().min(50).max(500),
    }),
    defineField({
      name: "navigationItems",
      title: "Navigation Items",
      type: "array",
      of: [
        defineField({
          name: "navigationItem",
          title: "Navigation Item",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "slug",
              title: "Slug",
              type: "slug",
              description: "El slug de la página a la que debe dirigir (ej: /posts, /about)",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "isExternal",
              title: "External Link",
              type: "boolean",
              description: "Marcar si es un enlace externo",
              initialValue: false,
            }),
          ],
          preview: {
            select: {
              title: "title",
              slug: "slug.current",
            },
            prepare({ title, slug }) {
              return {
                title,
                subtitle: `/${slug}`,
              };
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      logoText: "logoText",
      media: "logo",
    },
    prepare({ logoText, media }) {
      return {
        title: logoText || "Header Configuration",
        subtitle: "Header Settings",
        media: media ?? MenuIcon,
      };
    },
  },
});