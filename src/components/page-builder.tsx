import { createDataAttribute } from '@sanity/visual-editing'
import TextSection from './text-section'
import ImageTextSection from './image-text-section'

type Section = {
  _key: string
  _type: string
  title: string
  subtitle?: string | null
  content: BlockContent
  alignment?: 'left' | 'center' | 'right' | null
  backgroundColor?: 'white' | 'gray' | 'black' | null
  image?: {
    asset: {
      _id: string
      url: string | null
    } | null
    alt: string
  } | null
  imagePosition?: 'left' | 'right' | null
}

type BlockContent = Array<{
  _key: string
  _type: string
  children?: Array<{
    _key: string
    _type: string
    marks?: string[]
    text?: string
  }>
  style?: string
  listItem?: string
  markDefs?: Array<unknown>
  level?: number
}>

interface PageBuilderProps {
  sections: Section[]
  pageId?: string
}

export default function PageBuilder({ sections, pageId }: PageBuilderProps) {
  if (!sections || sections.length === 0) {
    return null
  }

  return (
    <div className="page-builder">
      {sections.map((section, index) => {
        const dataAttribute = pageId
          ? createDataAttribute({
              id: pageId,
              type: 'page',
              path: `sections[${index}]`,
            }).toString()
          : undefined

        switch (section._type) {
          case 'textSection':
            return (
              <div key={section._key} data-sanity={dataAttribute}>
                <TextSection
                  title={section.title}
                  subtitle={section.subtitle ?? undefined}
                  content={section.content}
                  alignment={section.alignment ?? undefined}
                  backgroundColor={section.backgroundColor ?? undefined}
                />
              </div>
            )
          case 'imageTextSection':
            if (!section.image) return null
            return (
              <div key={section._key} data-sanity={dataAttribute}>
                <ImageTextSection
                  title={section.title}
                  subtitle={section.subtitle ?? undefined}
                  content={section.content}
                  image={section.image}
                  imagePosition={section.imagePosition ?? undefined}
                  backgroundColor={section.backgroundColor ?? undefined}
                />
              </div>
            )
          default:
            return null
        }
      })}
    </div>
  )
}
