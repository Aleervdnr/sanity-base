import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {textSectionType} from './textSectionType'
import {imageTextSectionType} from './imageTextSectionType'
import {pageBuilderType} from './pageBuilderType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, postType, authorType, textSectionType, imageTextSectionType, pageBuilderType],
}
