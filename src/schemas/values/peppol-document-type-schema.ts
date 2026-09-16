import { Predicate, Schema } from 'effect';

import type { DocumentTypesTableKeys } from '#/values/document-type.generated';

import { opaque } from '#/schemas/utils/opaque.ts';
import { documentTypesTable, documentTypesTableKeys } from '#/values/document-type.generated';

/**
 * @description Validates a full PEPPOL document type identifier (`<scheme>::<value>`) against the known document type table. The scheme prefix must be a known key
 * and the full identifier must exist in the document type table (checked via a filter).
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid peppol document type'`.
 *
 * @returns An Effect schema that matches a valid `scheme::value` document type identifier.
 *
 * @see {@link documentTypesTable}
 */
export class PeppolDocumentType extends opaque<PeppolDocumentType>()(
  Schema.TemplateLiteral([Schema.Literals(documentTypesTableKeys), Schema.Literal('::'), Schema.String]).check(
    Schema.makeFilter((val: string) => {
      const [prefix, ...suffix] = val.split('::');
      if (Predicate.isNullish(prefix) || !documentTypesTableKeys.includes(prefix as never)) return false;
      const info = documentTypesTable[prefix as DocumentTypesTableKeys];
      return Predicate.isNotNullish(info) && info.some(v => v === suffix.join('::'));
    })
  )
) {}
