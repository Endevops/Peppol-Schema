import { Schema } from 'effect';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypesScheme } from '#/values/document-type.generated';

/**
 * @description Validates a PEPPOL document type scheme (e.g. `busdox-docid-qns`, `peppol-doctype-wildcard`).
 *
 * @param error - The error message to use when validation fails. Defaults to `'invalid Peppol document type scheme'`.
 *
 * @returns An Effect schema that accepts only valid document type schemes.
 *
 * @see {@link documentTypesScheme}
 */
export class PeppolDocumentTypeScheme extends opaque<PeppolDocumentTypeScheme>()(
  Schema.Literals(documentTypesScheme as [string, ...Array<string>])
) {}
