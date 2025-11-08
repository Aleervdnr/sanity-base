import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PAGE_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/lib/queries'
import PageBuilder from '@/components/page-builder'
import { Header } from '@/components/header'

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch({
    query: PAGES_SLUGS_QUERY,
    perspective: 'published',
    stega: false,
  })

  return pages.map((page: { slug: string | null }) => ({
    slug: page.slug,
  }))
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { data: page } = await sanityFetch({
    query: PAGE_QUERY,
    params: { slug },
    stega: false,
  })

  if (!page) {
    return notFound()
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        {page.title && (
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">{page.title}</h1>
            {page.description && (
              <p className="text-xl text-gray-600">{page.description}</p>
            )}
          </div>
        )}
        <PageBuilder sections={page.sections} pageId={page._id} />
      </div>
    </main>
  )
}
