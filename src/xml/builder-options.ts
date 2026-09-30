import type { XmlBuilderOptions } from '@endevops/builder';

import { commonXmlOptions } from '#/xml/common-xml-options.ts';

/**
 * @description Default `fast-xml-builder` options for serialising PEPPOL documents: {@link commonXmlOptions} with `suppressEmptyNode` forced on.
 *
 * @example
 *   ```ts
 *   builderOptions.attributeNamePrefix; // '@'
 *   builderOptions.suppressEmptyNode; // true
 *   ```;
 */
export const builderOptions = { ...commonXmlOptions, suppressEmptyNode: true } satisfies XmlBuilderOptions;
