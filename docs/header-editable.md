# Header Editable desde Studio

El header ahora es completamente editable desde Sanity Studio, permitiendo configurar el logo, texto del logo y elementos de navegación dinámicamente.

## Características

- **Logo personalizable**: Sube una imagen que se mostrará como logo
- **Texto de logo**: Texto alternativo o principal si no hay imagen
- **Navegación dinámica**: Agrega, edita y reordena elementos del menú
- **Enlaces externos**: Soporte para enlaces que abren en nueva pestaña
- **Singleton document**: Solo un documento de header por sitio

## Configuración inicial

1. Ve a `/studio` en tu navegador
2. En la barra lateral izquierda, busca "Header" 
3. Haz clic para crear/editar la configuración del header

## Campos disponibles

### Logo
- Sube una imagen que se usará como logo
- Se optimiza automáticamente a 40x40px
- Si no hay imagen, se mostrará el texto de logo

### Logo Text
- Texto que aparece junto al logo o como fallback
- También se usa como alt text para la imagen

### Logo Height
- Altura del logo en píxeles (valor por defecto: 70px)
- El ancho se ajusta automáticamente manteniendo la proporción
- Rango permitido: 20px - 200px

### Logo Max Width
- Ancho máximo del logo en píxeles (valor por defecto: 200px)
- Útil para controlar logos muy anchos
- Rango permitido: 50px - 500px

### Navigation Items
Array de elementos de navegación con:
- **Title**: Texto que se muestra en el menú
- **Slug**: Ruta a la que debe dirigir (ej: `posts`, `about`)
- **External Link**: Marca si es un enlace externo

## Ejemplo de configuración

```json
{
  "logo": { /* imagen subida */ },
  "logoText": "Mi Sitio Web",
  "logoHeight": 70,
  "logoMaxWidth": 200,
  "navigationItems": [
    {
      "title": "Inicio",
      "slug": { "current": "" },
      "isExternal": false
    },
    {
      "title": "Posts",
      "slug": { "current": "posts" },
      "isExternal": false
    },
    {
      "title": "Acerca de",
      "slug": { "current": "about" },
      "isExternal": false
    }
  ]
}
```

## Estructura técnica

### Archivos creados/modificados:
- `src/sanity/schemaTypes/headerType.ts` - Esquema del header
- `src/components/header.tsx` - Componente actualizado
- `src/sanity/lib/queries.ts` - Query para obtener datos del header
- `src/sanity/structure.ts` - Configuración del Studio
- `sanity.config.ts` - Configuración de documentos singleton

### Query utilizada:
```ts
export const HEADER_QUERY = defineQuery(`*[_type == "header"][0]{
  _id,
  logo,
  logoText,
  navigationItems[]{
    _key,
    title,
    slug,
    isExternal
  }
}`);
```

## Uso del componente

El componente Header ahora es async y obtiene los datos automáticamente:

```tsx
import { Header } from '@/components/header'

export default function Layout() {
  return (
    <>
      <Header />
      {/* resto del contenido */}
    </>
  )
}
```

## Estilos aplicados

- Header fijo en la parte superior (`fixed z-50`)
- Fondo semi-transparente (`bg-white/80`)
- Logo de máximo 40px de altura
- Hover effects en los enlaces de navegación
- Responsive design

## Buenas prácticas

1. **Logo**: Usa imágenes cuadradas o con aspect ratio 1:1 para mejores resultados
2. **Navegación**: Mantén entre 3-6 elementos para no sobrecargar
3. **Slugs**: Usa slugs descriptivos y consistentes con tu estructura de páginas
4. **Enlaces externos**: Marca correctamente los enlaces externos para que abran en nueva pestaña

## Fallbacks

- Si no hay configuración de header, se muestra "LOGO" por defecto
- Si no hay logo, se muestra solo el texto
- Si no hay elementos de navegación, se muestra solo el enlace al Studio