import type { XmlBuilderOptions } from 'fast-xml-builder';
import type { X2jOptions } from 'fast-xml-parser';

const commonOptions = {
  attributeNamePrefix: '@',
  format: false,
  ignoreAttributes: false,
  numberParseOptions: { hex: false, leadingZeros: false },
  parseAttributeValue: true,
  suppressBooleanAttributes: true,
  suppressEmptyNode: true,
  trimValues: true,
} satisfies X2jOptions & XmlBuilderOptions;

/**
 * @description The common options to parse an xml tree from a document.
 */
export const parserOptions = { ...commonOptions } satisfies X2jOptions;
/**
 * @description The common options used to build an xml tree from a document.
 */
export const builderOptions = { ...commonOptions, suppressEmptyNode: true } satisfies XmlBuilderOptions;
