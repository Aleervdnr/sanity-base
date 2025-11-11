# Integración Next.js + Sanity avanzada

Permite la generación de rutas dinámicas, SSR/SSG, previews y la obtención de datos en tiempo real desde Sanity, integrando el CMS headless con el frontend React.

## Archivos clave
- `src/app/(frontend)/[slug]/page.tsx`
- `src/app/(frontend)/posts/[slug]/page.tsx`
- `src/app/(frontend)/posts/page.tsx`

## Flujo de datos
1. **Generación de rutas dinámicas**: Next.js usa los slugs de Sanity para crear rutas dinámicas (`[slug]`).
2. **SSR/SSG**: Puedes usar `getStaticProps`/`getServerSideProps` (en App Router, loaders async) para obtener datos de Sanity en tiempo de build o request.
3. **Previews**: El draft mode permite mostrar contenido no publicado en rutas protegidas.
4. **Suscripción en tiempo real**: Con el cliente de Sanity y `live.ts`, puedes suscribirte a cambios y actualizar el frontend automáticamente.

## Ejemplo de obtención de datos

```ts
import { client } from '@/sanity/lib/client'
export async function getStaticProps({ params }) {
	const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]`, { slug: params.slug })
	return { props: { post } }
}
```

## Buenas prácticas
- Usa ISR (Incremental Static Regeneration) para escalar contenido dinámico.
- Protege las rutas de preview para evitar fugas de contenido no publicado.
- Centraliza la lógica de fetch y queries para facilitar el mantenimiento.

## Recursos
- [Next.js + Sanity Docs](https://www.sanity.io/guides/nextjs)
