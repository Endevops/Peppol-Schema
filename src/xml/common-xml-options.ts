import type { XmlBuilderOptions } from '@endevops/builder';

/**
 * @description Options shared by the XML parser and builder so documents round-trip: `@` attributes, coerced values, trimmed values.
 *
 * @example
 *   ```ts
 *   commonXmlOptions.attributeNamePrefix; // '@'
 *   commonXmlOptions.parseAttributeValue; // true
 *   ```;
 */
export const commonXmlOptions = {
  attributeNamePrefix: '@',
  format: false,
  ignoreAttributes: false,
  numberParseOptions: { hex: false, leadingZeros: false },
  parseAttributeValue: true,
  suppressBooleanAttributes: true,
  suppressEmptyNode: true,
  trimValues: true,
} satisfies XmlBuilderOptions;
