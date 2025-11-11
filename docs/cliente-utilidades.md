# Cliente de Sanity y Utilidades avanzadas

Gestiona la conexión, autenticación y consultas a la API de Sanity, así como la optimización de imágenes y la gestión de tokens.

## Archivos clave
- `src/sanity/lib/client.ts`
- `src/sanity/lib/queries.ts`
- `src/sanity/lib/token.ts`
- `src/sanity/lib/image.ts`

## Configuración del cliente

El cliente se configura con el dataset, projectId y token si es necesario:

```ts
import { createClient } from 'next-sanity'
export const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
	useCdn: false,
	apiVersion: '2023-01-01',
	token: process.env.SANITY_API_TOKEN,
})
```

## Consultas GROQ

Las queries se escriben en GROQ, el lenguaje de consulta de Sanity:

```ts
const query = `*[_type == "post" && slug.current == $slug][0]{title, content, author->{name}}`
const post = await client.fetch(query, { slug })
```

## Manejo de tokens

El archivo `token.ts` gestiona el acceso seguro a la API para operaciones autenticadas (por ejemplo, previews o mutaciones).

## Optimización de imágenes

`image.ts` ayuda a construir URLs optimizadas para imágenes, usando el builder de Sanity:

```ts
import imageUrlBuilder from '@sanity/image-url'
export const urlFor = (source) => imageUrlBuilder(client).image(source)
```

## Buenas prácticas
- Usa `useCdn: true` solo para datos públicos y no sensibles.
- Mantén los tokens fuera del frontend y usa variables de entorno.
- Centraliza las queries y utilidades para facilitar el mantenimiento.

## Recursos
- [Sanity JS Client Docs](https://www.sanity.io/docs/js-client)
- [GROQ Language Docs](https://www.sanity.io/docs/groq)
