import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import type { DocumentTypesTableKeys } from '#/values/document-type.generated';

import { documentTypesTable, documentTypesTableKeys } from '#/values/document-type.generated';

/**
 * @description One of the PEPPOL document type schemes (e.g. `busdox-docid-qns`, `peppol-doctype-wildcard`).
 *
 * @see {@link documentTypesTable}
 */
export type PeppolDocumentType = `${DocumentTypesTableKeys}::${string}`;

const entries = /* @__PURE__ */ objectEntries(documentTypesTable);

/**
 * @description Validates a full PEPPOL document type identifier (`<scheme>::<root>::…`) against the known document type table.
 *
 * @param error - The custom error message to use when validation fails. Defaults to `'invalid peppol document type'`.
 *
 * @returns A Zod template-literal schema that matches a valid `scheme::value` document type identifier.
 *
 * @see {@link documentTypesTable}
 */
export function documentTypeSchema(error = 'invalid peppol document type') {
  return z
    .templateLiteral(
      [
        // NOTE: segment matching is structural, so the scheme prefix is narrowed
        // to the known keys while the full identifier is still checked against
        // the document type table by the `.check` below.
        z.enum(documentTypesTableKeys),
        z.literal('::'),
        z.string(),
      ],
      error
    )
    .check(
      z.refine(
        val => {
          const [prefix, ...suffix] = val.split('::') as [string, string, string, string];
          const [, info] = entries.find(([code]) => code === prefix) ?? [];
          return info?.some(v => v === suffix.join('::'));
        },
        { error }
      )
    );
}
