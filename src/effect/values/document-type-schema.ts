import { Schema } from 'effect';

import type { DocumentTypesTableKeys } from '#/values/document-type.generated';

import { documentTypesTable, documentTypesTableKeys } from '#/values/document-type.generated';

/**
 * @description One of the PEPPOL document type schemes (e.g. `busdox-docid-qns`, `peppol-doctype-wildcard`).
 *
 * @see {@link documentTypesTable}
 */
export type PeppolDocumentType = `${DocumentTypesTableKeys}::${string}`;

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
export function documentTypeSchema(error = 'invalid peppol document type') {
  return Schema.String.check(
    Schema.makeFilter((val: string) => {
      const [prefix, ...suffix] = val.split('::');
      if (prefix === undefined || !documentTypesTableKeys.includes(prefix as never)) return false;
      const info = documentTypesTable[prefix as DocumentTypesTableKeys];
      return info !== undefined && info.some(v => v === suffix.join('::'));
    })
  ).annotate({ message: error });
}
