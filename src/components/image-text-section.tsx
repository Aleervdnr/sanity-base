import { PortableText } from 'next-sanity'
import Image from 'next/image'
import { components } from '@/sanity/portableTextComponents'

interface ImageTextSectionProps {
  title: string
  subtitle?: string
  content: BlockContent
  image: {
    asset: {
      _id: string
      url: string | null
    } | null
    alt: string
  }
  imagePosition?: 'left' | 'right'
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

export default function ImageTextSection({
  title,
  subtitle,
  content,
  image,
  imagePosition = 'left',
  backgroundColor = 'white',
}: ImageTextSectionProps) {
  if (!image?.asset?.url) {
    return null
  }

  return (
    <section className={`py-16 px-4 ${bgColorClasses[backgroundColor]}`}>
      <div className="max-w-7xl mx-auto">
        <div
          className={`grid md:grid-cols-2 gap-8 items-center ${
            imagePosition === 'right' ? 'md:grid-flow-col-dense' : ''
          }`}
        >
          <div className={imagePosition === 'right' ? 'md:col-start-2' : ''}>
            <Image
              src={image.asset.url!}
              alt={image.alt}
              width={800}
              height={600}
              className="rounded-lg w-full h-auto object-cover"
            />
          </div>
          <div className={imagePosition === 'right' ? 'md:col-start-1 md:row-start-1' : ''}>
            <h2 className="text-4xl font-bold mb-4">{title}</h2>
            {subtitle && (
              <p className="text-xl mb-6 opacity-80">{subtitle}</p>
            )}
            <div className="prose prose-lg max-w-none">
              <PortableText value={content} components={components} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
