import type { X2jOptions } from 'fast-xml-parser';

import { commonXmlOptions } from '#/xml/common-xml-options.ts';

export const parserOptions = { ...commonXmlOptions } satisfies X2jOptions;
