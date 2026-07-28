import type { XmlBuilderOptions } from 'fast-xml-builder';

import { commonXmlOptions } from '#/xml/common-xml-options';

export const builderOptions = { ...commonXmlOptions, suppressEmptyNode: true } satisfies XmlBuilderOptions;
