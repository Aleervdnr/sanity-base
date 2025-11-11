# Portable Text y Componentes Personalizados

Portable Text es el sistema de contenido rico de Sanity, que permite almacenar y renderizar textos, imágenes, listas, enlaces y más, de forma estructurada y extensible.

## Archivos clave
- `src/sanity/portableTextComponents.tsx`

## ¿Cómo funciona?

1. **Definición en esquemas**: Se usa el tipo `blockContent` en los esquemas para campos de texto enriquecido.
2. **Serialización en el frontend**: Se utiliza un componente como `@portabletext/react` junto con `portableTextComponents.tsx` para mapear cada tipo de bloque, marca o lista a un componente React personalizado.

## Ejemplo de uso

```tsx
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/sanity/portableTextComponents'

<PortableText value={content} components={portableTextComponents} />
```

## Ejemplo de definición de componentes

```ts
export const portableTextComponents = {
	types: {
		image: ({ value }) => <img src={value.asset.url} alt={value.alt} />,
		// ...otros tipos
	},
	marks: {
		link: ({ children, value }) => <a href={value.href}>{children}</a>,
		// ...otras marcas
	},
	block: {
		h1: ({ children }) => <h1>{children}</h1>,
		// ...otros estilos
	},
	list: {
		bullet: ({ children }) => <ul>{children}</ul>,
		number: ({ children }) => <ol>{children}</ol>,
	},
}
```

## Buenas prácticas
- Personaliza los componentes para mantener la coherencia visual.
- Usa marcas (`marks`) para enlaces, negritas, etc.
- Controla la sanitización y el escape de HTML si renderizas contenido externo.

## Recursos
- [Sanity Portable Text Docs](https://www.sanity.io/docs/portable-text)
