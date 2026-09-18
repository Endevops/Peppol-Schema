import { Schema } from 'effect';

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
export const PeppolDocumentTypeScheme = Schema.Literals(documentTypesScheme as [string, ...Array<string>]).pipe(Schema.toStandardSchemaV1);

/**
 * @description Decoded form of {@link PeppolDocumentTypeScheme}.
 */
export type PeppolDocumentTypeScheme = Schema.Schema.Type<typeof PeppolDocumentTypeScheme>;
