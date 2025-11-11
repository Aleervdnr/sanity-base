# Esquemas y Tipos de Contenido en Sanity

Los esquemas definen la estructura, validaciones y relaciones de los datos en Sanity. Permiten modelar desde documentos principales (posts, páginas, autores) hasta bloques reutilizables (textos, imágenes, secciones).

## Tipos principales

- **Tipos de documento**: Representan entidades principales editables en el Studio (ej: `post`, `page`, `author`). Se almacenan como documentos independientes en la base de datos de Sanity.
- **Tipos de objeto**: Son bloques reutilizables que se anidan dentro de documentos o arrays (ej: `textSection`, `imageTextSection`, `blockContent`). No existen por sí solos, siempre están contenidos en un documento.

## Archivos clave
- `src/sanity/schemaTypes/` (todos los archivos)
- Ejemplos: `authorType.ts`, `postType.ts`, `textSectionType.ts`, `blockContentType.ts`, etc.

## Ejemplo de tipo de documento

```ts
// postType.ts
export const postType = defineType({
	name: 'post',
	title: 'Post',
	type: 'document',
	fields: [
		defineField({ name: 'title', type: 'string', validation: Rule => Rule.required() }),
		defineField({ name: 'author', type: 'reference', to: [{ type: 'author' }] }),
		defineField({ name: 'content', type: 'blockContent' }),
		// ...
	]
})
```

## Ejemplo de tipo de objeto

```ts
// textSectionType.ts
export const textSectionType = defineType({
	name: 'textSection',
	type: 'object',
	fields: [
		defineField({ name: 'title', type: 'string' }),
		defineField({ name: 'content', type: 'blockContent' }),
		// ...
	]
})
```

## Arrays y bloques
Puedes definir arrays de objetos para construir páginas modulares:

```ts
defineField({
	name: 'sections',
	type: 'array',
	of: [
		{ type: 'textSection' },
		{ type: 'imageTextSection' }
	]
})
```

## Validaciones
Las validaciones se definen por campo y permiten asegurar la calidad de los datos:

```ts
defineField({
	name: 'title',
	type: 'string',
	validation: Rule => Rule.required().min(5)
})
```

## Previews personalizados
Puedes personalizar cómo se muestran los documentos y objetos en el Studio:

```ts
preview: {
	select: { title: 'title', subtitle: 'slug.current' },
	prepare(selection) {
		return { title: selection.title, subtitle: `/${selection.subtitle}` }
	}
}
```

## Extensión y composición de esquemas
Puedes importar y combinar tipos en `index.ts`:

```ts
import { postType } from './postType'
import { authorType } from './authorType'
// ...
export const schemaTypes = [postType, authorType, ...]
```

## Buenas prácticas
- Usa nombres únicos y descriptivos para cada tipo.
- Separa los tipos de documento y objeto en archivos distintos.
- Aprovecha las validaciones para evitar errores de contenido.
- Personaliza los previews para mejorar la experiencia del editor.

## Recursos
- [Sanity Schema Docs](https://www.sanity.io/docs/schema-types)
