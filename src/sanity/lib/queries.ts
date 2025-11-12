import { defineQuery } from 'next-sanity'

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  }
}`)

export const POSTS_SLUGS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)]{ 
  "slug": slug.current
}`)

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  body,
  mainImage,
  publishedAt,
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  author->{
    name,
    image
  },
  relatedPosts[]{
    _key, // required for drag and drop
    ...@->{_id, title, slug} // get fields from the referenced post
  }
}`);

export const PAGES_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current)]|order(publishedAt desc){
  _id,
  title,
  slug,
  description,
  sections,
  publishedAt
}`);

export const PAGES_SLUGS_QUERY =
  defineQuery(`*[_type == "page" && defined(slug.current)]{ 
  "slug": slug.current
}`);

// ...all other queries

export const PAGE_QUERY =
  defineQuery(`*[_type == "page" && slug.current == $slug][0]{
  ...,
  content[]{
    ...,
    _type == "faqs" => {
      ...,
      faqs[]->
    }
  }
}`);

export const HOME_PAGE_QUERY = defineQuery(`*[_id == "siteSettings"][0]{
    homePage->{
      ...,
      content[]{
        ...,
        _type == "faqs" => {
          ...,
          faqs[]->
        }
      }      
    }
  }`);

export const HEADER_QUERY = defineQuery(`*[_type == "header"][0]{
  _id,
  logo,
  logoText,
  logoHeight,
  logoMaxWidth,
  navigationItems[]{
    _key,
    title,
    slug,
    isExternal
  }
}`);