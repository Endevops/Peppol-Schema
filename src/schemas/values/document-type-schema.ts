import type { Brand } from 'effect';

import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import type { documentTypesScheme } from '#/values/document-type.generated';

import { documentTypesTable } from '#/values/document-type.generated';

export type PeppolDocumentType = Brand.Branded<string, 'PeppolDocumentType'>;
export type PeppolDocumentTypeSchema = (typeof documentTypesScheme)[number];

const entries = /* @__PURE__ */ objectEntries(documentTypesTable);

export function documentTypeSchema(error = 'invalid peppol document type') {
  return z
    .templateLiteral(
      [
        // NOTE: zod's template-literal segments are matched structurally, so a
        // `.check(z.refine(...))` on a segment would never run. The scheme prefix
        // is validated against the whole identifier by the check below instead.
        z.string(),
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
