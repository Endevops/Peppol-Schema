import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypesScheme } from '#/values/document-type.generated';

/**
 * @description A PEPPOL document type scheme, for example `busdox-docid-qns` or `peppol-doctype-wildcard`.
 *
 * @example
 *   ```ts
 *   'busdox-docid-qns';
 *   ```;
 *
 * @see {@link documentTypesScheme}
 */
export class PeppolDocumentTypeScheme extends opaque<PeppolDocumentTypeScheme>()(
  Schema.Literals(documentTypesScheme as [string, ...Array<string>])
) {}
