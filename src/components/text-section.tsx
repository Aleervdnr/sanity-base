import { PortableText } from 'next-sanity'
import { components } from '@/sanity/portableTextComponents'

interface TextSectionProps {
  title: string
  subtitle?: string
  content: BlockContent
  alignment?: 'left' | 'center' | 'right'
  backgroundColor?: 'white' | 'gray' | 'black'
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

const bgColorClasses = {
  white: 'bg-white text-gray-900',
  gray: 'bg-gray-100 text-gray-900',
  black: 'bg-gray-900 text-white',
}

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
}

export default function TextSection({
  title,
  subtitle,
  content,
  alignment = 'left',
  backgroundColor = 'white',
}: TextSectionProps) {
  return (
    <section className={`py-16 px-4 ${bgColorClasses[backgroundColor]}`}>
      <div className={`max-w-4xl mx-auto ${alignmentClasses[alignment]}`}>
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {subtitle && (
          <p className="text-xl mb-8 opacity-80">{subtitle}</p>
        )}
        <div className="prose prose-lg max-w-none">
          <PortableText value={content} components={components} />
        </div>
      </div>
    </section>
  )
}
