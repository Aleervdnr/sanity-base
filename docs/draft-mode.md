# Draft Mode (Modo Borrador) avanzado

El draft mode permite previsualizar contenido no publicado desde Sanity en el frontend, mostrando cambios en tiempo real antes de hacerlos públicos. Es fundamental para flujos de trabajo de edición colaborativa y preview de contenido.

## Archivos clave
- `src/app/api/draft-mode/enable/route.ts`
- `src/app/api/draft-mode/disable/route.ts`
- `src/components/disable-draft-mode.tsx`
- `src/sanity/lib/live.ts`

## ¿Cómo funciona el draft mode?

1. **Activación**: Cuando un editor hace clic en "Enable Draft Mode" (por ejemplo, desde el Studio), se hace una petición a `/api/draft-mode/enable`. Esto setea una cookie especial (`__prerender_bypass` y/o `__next_preview_data`) en el navegador.
2. **Next.js detecta el modo**: En las rutas del frontend, Next.js detecta la cookie y habilita el modo draft, permitiendo mostrar datos no publicados (borradores) desde Sanity.
3. **Suscripción en tiempo real**: El archivo `live.ts` utiliza la API de escucha de Sanity para suscribirse a cambios en los documentos, mostrando actualizaciones instantáneas en el frontend.
4. **Desactivación**: El usuario puede salir del modo borrador accediendo a `/api/draft-mode/disable` o usando el componente `disable-draft-mode.tsx`, que elimina la cookie y recarga la página en modo "live".

## Ejemplo de activación/desactivación

```ts
// enable/route.ts
import { draftMode } from 'next/headers'
export async function GET() {
	draftMode().enable()
	return new Response('Draft mode enabled')
}

// disable/route.ts
export async function GET() {
	draftMode().disable()
	return new Response('Draft mode disabled')
}
```

## Uso en el frontend

En los data fetchers (por ejemplo, en `getServerSideProps` o en los loaders de Next.js), puedes detectar si el draft mode está activo y ajustar la consulta a Sanity:

```ts
import { client } from '@/sanity/lib/client'
const data = await client.fetch(query, params, { perspective: draftMode ? 'previewDrafts' : 'published' })
```

## Edge cases y consideraciones
- El draft mode solo debe estar habilitado para usuarios autenticados o editores.
- Si usas ISR (Incremental Static Regeneration), asegúrate de invalidar correctamente los cachés.
- El draft mode puede exponer datos sensibles si no se controla el acceso.

## Recursos
- [Next.js Draft Mode Docs](https://nextjs.org/docs/pages/building-your-application/data-fetching/draft-mode)
- [Sanity Preview Docs](https://www.sanity.io/docs/preview-content-on-site)
