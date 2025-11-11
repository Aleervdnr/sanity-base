import { type SchemaTypeDefinition } from "sanity";

import { blockContentType } from "./blockContentType";
import { categoryType } from "./categoryType";
import { postType } from "./postType";
import { authorType } from "./authorType";
import { textSectionType } from "./textSectionType";
import { imageTextSectionType } from "./imageTextSectionType";
import { pageType } from "./pageType";
import { faqType } from "./faqType";
import { faqsType } from "./blocks/faqsType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";
import { pageBuilderType } from "./pageBuilderType";
import { featuresType } from "./blocks/featuresType";
import { siteSettingsType } from "./siteSettingsType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    blockContentType,
    categoryType,
    postType,
    authorType,
    textSectionType,
    imageTextSectionType,
    pageBuilderType,
    pageType,
    faqType,
    faqsType,
    featuresType,
    heroType,
    splitImageType,
    siteSettingsType
  ],
};
