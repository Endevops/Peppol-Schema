import type { X2jOptions } from 'fast-xml-parser';

import { commonXmlOptions } from '#/xml/common-xml-options.ts';

/**
 * @description Default `fast-xml-parser` options for parsing PEPPOL documents. Equal to {@link commonXmlOptions}.
 *
 * @example
 *   ```ts
 *   parserOptions.attributeNamePrefix; // '@'
 *   parserOptions.ignoreAttributes; // false
 *   ```;
 */
export const parserOptions = { ...commonXmlOptions } satisfies X2jOptions;
