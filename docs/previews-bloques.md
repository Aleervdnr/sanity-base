# Previews y Bloques Personalizados avanzados

Permite mostrar vistas previas ricas y personalizadas de los bloques y documentos en el panel de Sanity Studio, mejorando la experiencia del editor y la coherencia visual con el frontend.

## Archivos clave
- `public/block-previews/` (hero.png, features.png, splitImage.png, faqs.png)
- `src/components/blocks/` (hero.tsx, features.tsx, split-image.tsx, faqs.tsx)
- `src/sanity/schemaTypes/blocks/` (heroType.ts, featuresType.ts, splitImageType.ts, faqsType.ts)

## ¿Cómo funciona?

1. **Definición de bloques**: En los esquemas (`schemaTypes/blocks/`), defines tipos de objeto reutilizables con iconos específicos de Sanity Icons.
2. **Renderizado en el Studio**: Cada bloque tiene un preview personalizado usando la propiedad `preview`:

```ts
preview: {
  select: { title: 'title', media: 'image' },
  prepare({ title, media }) {
    return {
      title,
      subtitle: 'Hero',
      media: media ?? TextIcon,
    }
  }
}
```

3. **Previews visuales con imágenes**: El pageBuilder utiliza un sistema de grid view con imágenes PNG:

```ts
options: {
  insertMenu: {
    views: [
      {
        name: "grid",
        previewImageUrl: (schemaType) => `/block-previews/${schemaType}.png`,
      },
    ],
  },
}
```

4. **Renderizado en el frontend**: Los bloques se renderizan usando componentes React tipados con TypeScript, extrayendo el tipo específico del resultado de la query:

```tsx
type HeroProps = Extract<
  NonNullable<NonNullable<PAGE_QUERYResult>["content"]>[number],
  { _type: "hero" }
>;
```

## Ejemplos de bloques implementados

### Hero Block
```ts
export const heroType = defineType({
  name: "hero",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "text", type: "blockContent" }),
    defineField({ name: "image", type: "image" }),
  ],
  icon: TextIcon,
  preview: {
    select: { title: "title", media: "image" },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Hero",
        media: media ?? TextIcon,
      };
    },
  },
});
```

### Features Block
```ts
export const featuresType = defineType({
  name: "features",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({
      name: "features",
      type: "array",
      of: [defineField({
        name: "feature",
        type: "object",
        fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "text", type: "string" }),
        ],
      })],
    }),
  ],
  icon: StarIcon,
});
```

## Buenas prácticas
- Usa iconos específicos de `@sanity/icons` para cada bloque
- Implementa previews con imágenes PNG en `public/block-previews/`
- Mantén correspondencia 1:1 entre esquemas y componentes React
- Usa TypeScript para extraer tipos específicos de las queries
- Implementa fallbacks para casos donde no se encuentra el bloque

## Recursos
- [Sanity Icons](https://icons.sanity.io/)
- [Sanity Schema Types](https://www.sanity.io/docs/schema-types)
