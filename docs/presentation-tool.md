# Presentation Tool avanzado

La Presentation Tool permite a los editores de contenido previsualizar exactamente cómo se verá un documento en el frontend, antes de publicarlo. Es clave para flujos de trabajo "headless" y edición visual.

## Archivos clave
- `src/sanity/presentation/resolve.ts`
- `src/app/studio/[[...tool]]/page.tsx`

## ¿Cómo funciona?

1. **Resolución de rutas**: El archivo `resolve.ts` define cómo mapear un documento de Sanity a una URL de preview en el frontend. Por ejemplo, un post con slug `mi-post` se previsualiza en `/mi-post`.
2. **Integración Studio ↔ Frontend**: El Studio de Sanity (en `/studio`) utiliza la Presentation Tool para abrir el frontend en modo preview, pasando el contexto del documento y el draft mode.
3. **Sincronización en tiempo real**: Los cambios en el Studio se reflejan instantáneamente en el frontend gracias al draft mode y las suscripciones en vivo.

## Ejemplo de resolve.ts

```ts
export function resolveProductionUrl(document) {
	if (document._type === 'post') {
		return `${process.env.NEXT_PUBLIC_SITE_URL}/posts/${document.slug.current}?preview=true`
	}
	// ...otros tipos
}
```

## Ejemplo de integración en el Studio

```ts
// En la configuración del Studio
import { resolveProductionUrl } from './presentation/resolve'
export default defineConfig({
	// ...
	tools: [
		visionTool(),
		presentationTool({
			previewUrl: resolveProductionUrl,
		})
	]
})
```

## Buenas prácticas
- Asegúrate de que las URLs de preview sean seguras y no indexables por buscadores.
- Usa el draft mode para mostrar contenido no publicado.
- Sincroniza los data-attributes para edición visual directa desde el preview.

## Recursos
- [Sanity Presentation Tool Docs](https://www.sanity.io/docs/presentation)
