# Cómo agregar nuevos Component Blocks

Esta guía te muestra paso a paso cómo agregar nuevos bloques al sistema de page-builder de Sanity, incluyendo la creación del esquema, el componente React, las previews y la integración completa.

## Proceso completo

### 1. Crear el esquema del bloque

Crea un nuevo archivo en `src/sanity/schemaTypes/blocks/` para definir la estructura de tu bloque:

```ts
// src/sanity/schemaTypes/blocks/testimonialType.ts
import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "object",
  fields: [
    defineField({
      name: "quote",
      title: "Quote",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Author Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  icon: UserIcon,
  preview: {
    select: {
      title: "author",
      subtitle: "quote",
      media: "image",
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `"${subtitle?.slice(0, 50)}..."`,
        media: media ?? UserIcon,
      };
    },
  },
});
```

### 2. Agregar el bloque al pageBuilder

Modifica `src/sanity/schemaTypes/pageBuilderType.ts` para incluir tu nuevo bloque:

```ts
import { defineType, defineArrayMember } from "sanity";

export const pageBuilderType = defineType({
  name: "pageBuilder",
  type: "array",
  of: [
    defineArrayMember({ type: "hero" }),
    defineArrayMember({ type: "splitImage" }),
    defineArrayMember({ type: "features" }),
    defineArrayMember({ type: "faqs" }),
    defineArrayMember({ type: "testimonial" }), // ← Nuevo bloque
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
        },
      ],
    },
  },
});
```

### 3. Crear la imagen de preview

Crea una imagen PNG de 400x300px aproximadamente y guárdala en `public/block-previews/testimonial.png`. Esta imagen se mostrará en el grid view del Studio cuando se agreguen bloques.

### 4. Registrar el esquema

Agrega el nuevo tipo al archivo principal de esquemas en `src/sanity/schemaTypes/index.ts`:

```ts
import { testimonialType } from "./blocks/testimonialType"

export const schemaTypes = [
  // ...otros tipos existentes
  testimonialType,
]
```

### 5. Crear el componente React

Crea el componente en `src/components/blocks/testimonial.tsx`:

```tsx
import { PAGE_QUERYResult } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

type TestimonialProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "testimonial" }
>;

export function Testimonial({ quote, author, role, image }: TestimonialProps) {
  return (
    <section className="container mx-auto py-16">
      <div className="max-w-4xl mx-auto text-center">
        <blockquote className="text-2xl md:text-3xl font-light text-gray-800 mb-8">
          "{quote}"
        </blockquote>
        
        <div className="flex items-center justify-center gap-4">
          {image ? (
            <Image
              className="w-16 h-16 rounded-full object-cover"
              src={urlFor(image).width(64).height(64).url()}
              width={64}
              height={64}
              alt={author || ""}
            />
          ) : null}
          
          <div className="text-left">
            <div className="font-semibold text-gray-900">{author}</div>
            {role ? (
              <div className="text-gray-600 text-sm">{role}</div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
```

### 6. Integrar en el PageBuilder

Modifica `src/components/page-builder.tsx` para incluir tu nuevo componente:

```tsx
"use client";

import { Hero } from "@/components/blocks/hero";
import { Features } from "@/components/blocks/features";
import { SplitImage } from "@/components/blocks/split-image";
import { FAQs } from "@/components/blocks/faqs";
import { Testimonial } from "@/components/blocks/testimonial"; // ← Importar

// ...resto del componente

switch (block._type) {
  case "hero":
    return (
      <DragHandle key={block._key}>
        <Hero {...block} />
      </DragHandle>
    );
  // ...otros casos
  case "testimonial": // ← Nuevo caso
    return (
      <DragHandle key={block._key}>
        <Testimonial {...block} />
      </DragHandle>
    );
  default:
    return <div key={block._key}>Block not found: {block._type}</div>;
}
```

### 7. Regenerar tipos de TypeScript (opcional)

Si usas generación automática de tipos, ejecuta:

```bash
npm run typegen
```

## Patrón de nomenclatura

- **Esquema**: `nombreType.ts` (ej: `testimonialType.ts`)
- **Componente**: `nombre.tsx` (ej: `testimonial.tsx`)
- **Preview**: `nombre.png` (ej: `testimonial.png`)
- **Tipo en Sanity**: mismo nombre que el archivo sin "Type"

## Buenas prácticas

### Esquemas
- Usa validaciones apropiadas (`Rule.required()`, `.min()`, `.max()`)
- Implementa previews descriptivos
- Usa iconos de `@sanity/icons` para mejor UX
- Agrupa campos relacionados con `fieldsets` si es necesario

### Componentes
- Extrae el tipo correcto de `PAGE_QUERYResult`
- Usa `urlFor()` para optimizar imágenes
- Implementa responsive design
- Maneja casos donde los campos opcionales pueden ser null/undefined

### Organización
- Un archivo por tipo de bloque
- Mantén consistencia en la estructura de carpetas
- Documenta bloques complejos con comentarios

## Debugging

Si tu bloque no aparece:
1. Verifica que esté registrado en `index.ts`
2. Revisa que esté agregado al `pageBuilderType.ts`
3. Confirma que el case en el switch del PageBuilder coincida exactamente
4. Asegúrate de que la imagen de preview exista

## Recursos adicionales

- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
- [Sanity Icons](https://icons.sanity.io/)
- [Next.js Image Optimization](https://nextjs.org/docs/basic-features/image-optimization)