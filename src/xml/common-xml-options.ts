import type { XmlBuilderOptions } from 'fast-xml-builder';
import type { X2jOptions } from 'fast-xml-parser';

export const commonXmlOptions = {
  attributeNamePrefix: '@',
  format: false,
  ignoreAttributes: false,
  numberParseOptions: { hex: false, leadingZeros: false },
  parseAttributeValue: true,
  suppressBooleanAttributes: true,
  suppressEmptyNode: true,
  trimValues: true,
} satisfies X2jOptions & XmlBuilderOptions;
