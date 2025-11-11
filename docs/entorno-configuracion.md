# Variables de Entorno y Configuración avanzada

Gestiona las credenciales, configuraciones y parámetros necesarios para conectar y operar con Sanity de forma segura y flexible en distintos entornos (local, staging, producción).

## Archivos clave
- `src/sanity/env.ts`
- `sanity.config.ts`
- `sanity.cli.ts`

## Uso de variables de entorno

Las variables de entorno permiten separar credenciales y configuraciones sensibles del código fuente. Ejemplo de `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_... (solo en backend)
NEXT_PUBLIC_SITE_URL=https://tusitio.com
```

## Configuración en el código

```ts
// env.ts
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiToken = process.env.SANITY_API_TOKEN
```

## Diferencias local vs producción
- En local puedes usar datasets de prueba y tokens con permisos limitados.
- En producción, usa tokens restringidos y nunca expongas el token de API en el frontend.

## Buenas prácticas
- Nunca subas archivos `.env` a git.
- Usa variables `NEXT_PUBLIC_` solo para datos que pueden ser públicos.
- Centraliza la lectura de variables en un solo archivo (`env.ts`).

## Recursos
- [Sanity Environment Docs](https://www.sanity.io/docs/environment-variables)
