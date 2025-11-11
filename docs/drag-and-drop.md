
# Drag and Drop avanzado en Sanity

Permite reordenar bloques de contenido o elementos dentro de los documentos de Sanity mediante arrastrar y soltar, tanto en el Studio como en el frontend, manteniendo la sincronización entre la edición visual y la estructura de datos.

## Archivos clave
- `src/components/page-builder.tsx`
- `src/sanity/schemaTypes/pageBuilderType.ts`
- `src/components/blocks/` (todos los componentes de bloques)
- `src/sanity/schemaTypes/blocks/` (todos los esquemas de bloques)

## Funcionamiento general
- El `page-builder.tsx` utiliza `useOptimistic` de next-sanity para actualizaciones optimistas en tiempo real
- El esquema `pageBuilderType.ts` define el array de bloques disponibles: hero, splitImage, features, faqs
- Cada bloque tiene su propio componente React y esquema de Sanity correspondiente

## data-attributes y data-sanity

Para habilitar la edición visual y la integración con herramientas como Presentation Tool o Sanity Visual Editing, se utilizan atributos personalizados en los elementos del DOM:

- **data-sanity**: Este atributo identifica de forma única cada bloque o sección en el frontend, enlazándolo con el documento y la ruta de datos en Sanity. Permite que el Studio y las herramientas de edición visual reconozcan y resalten el bloque correspondiente cuando se edita desde el panel de administración.
- **data-attributes**: Se generan usando `createDataAttribute` de `next-sanity`, que codifican información como el ID del documento, el tipo y la ruta específica del bloque usando `_key`.

### Ejemplo de uso en el código actual

```tsx
import { createDataAttribute } from 'next-sanity'

// Configuración del data attribute
const { projectId, dataset, stega } = client.config();
export const createDataAttributeConfig = {
  projectId,
  dataset,
  baseUrl: typeof stega.studioUrl === "string" ? stega.studioUrl : "",
};

// Wrapper para cada bloque
const DragHandle = ({ children }: { children: React.ReactNode }) => (
  <div
    data-sanity={createDataAttribute({
      ...createDataAttributeConfig,
      id: documentId,
      type: documentType,
      path: `content[_key=="${block._key}"]`,
    }).toString()}
  >
    {children}
  </div>
);
```

### useOptimistic para actualizaciones en tiempo real

El nuevo sistema utiliza `useOptimistic` de next-sanity para actualizaciones optimistas:

```tsx
const blocks = useOptimistic<
  NonNullable<PAGE_QUERYResult>["content"] | undefined,
  NonNullable<PAGE_QUERYResult>
>(content, (state, action) => {
  if (action.id === documentId) {
    return action?.document?.content?.map(
      (block) => state?.find((s) => s._key === block?._key) || block
    );
  }
  return state;
});
```

Esto permite que, al hacer clic en un bloque en el frontend, el Studio pueda navegar automáticamente a la sección correspondiente en el editor de Sanity, facilitando la edición visual y el drag and drop sincronizado.## Sincronización Studio ↔ Frontend

Cuando se reordena un bloque en el Studio, el cambio se refleja en el frontend gracias a:
- **useOptimistic**: Actualizaciones optimistas instantáneas
- **data-attributes precisos**: Identificación única usando `content[_key=="${block._key}"]`
- **Componente DragHandle**: Wrapper que envuelve cada bloque con los atributos necesarios

## Nuevos tipos de bloques disponibles

### Hero
- Sección principal con título, texto y imagen de fondo
- Renderizado en `src/components/blocks/hero.tsx`
- Esquema en `src/sanity/schemaTypes/blocks/heroType.ts`

### Features
- Lista de características con título y descripción
- Grid de 3 columnas responsivo
- Renderizado en `src/components/blocks/features.tsx`

### Split Image
- Sección con imagen y título, orientación configurable
- Orientación: `imageLeft` o `imageRight`
- Renderizado en `src/components/blocks/split-image.tsx`

### FAQs
- Lista de preguntas frecuentes expandibles
- Referencias a documentos FAQ independientes
- Renderizado en `src/components/blocks/faqs.tsx`

## Buenas prácticas
- Siempre usar el componente `DragHandle` para wrappear bloques
- Mantener consistencia entre el tipo de esquema y el componente React
- Usar `_key` como identificador único para cada bloque
- Implementar previews personalizados para mejor UX en el Studio

## Recursos
- [Next Sanity Docs](https://github.com/sanity-io/next-sanity)
- [Sanity Visual Editing Docs](https://www.sanity.io/docs/visual-editing)
- [Sanity-learn](https://www.sanity.io/learn/course/visual-editing-with-next-js/add-drag-and-drop-elements)