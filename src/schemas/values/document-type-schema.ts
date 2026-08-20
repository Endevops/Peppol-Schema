import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import type { deprecateddocumentTypes, documentTypesProcessIds, documentTypesScheme } from '#/values/document-type.generated';

import { INVOICE_DOCTYPE_ID } from '#/constants/invoice-doctype-id';
import { documentTypesTable } from '#/values/document-type.generated';

export type PeppolDocumentType = Exclude<z.infer<ReturnType<typeof documentTypeSchema>>, (typeof deprecateddocumentTypes)[number]>;
export type PeppolDocumentTypeSchema = (typeof documentTypesScheme)[number];
type PeppolDocumentProcess = typeof documentTypesProcessIds;

export type PeppolProcessIdsForDocumentType<DocType extends PeppolDocumentType> =
  PeppolDocumentProcess extends Record<DocType, infer Process>
    ? Process extends ReadonlyArray<{ scheme: infer Scheme; value: infer Value }>
      ? Scheme extends string
        ? Value extends string
          ? `${Scheme}::${Value}`
          : never
        : never
      : never
    : never;

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
        { error: 'invalid document type value' }
      )
    );
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('document-type', () => {
    it.fails('should not contains duplicates', () => {
      expect(
        entries
          .flatMap(([key, values]) => values.map(value => [value, key]))
          .filter(([key], idx, arr) => arr.findIndex(([arrK]) => arrK === key) !== idx)
      ).toEqual([]);
    });

    it.each(entries.flatMap(([key, values]) => values.map(value => [`${key}::${value}`, `${key}::${value}`])) as [[string, string]])(
      'should parse %s as %s',
      (value, expected) => {
        expect(documentTypeSchema().parse(value, { reportInput: true })).toEqual(expected);
      }
    );

    it('should decode a document type without modifying its value', () => {
      expect(z.decode(documentTypeSchema(), INVOICE_DOCTYPE_ID)).toEqual(INVOICE_DOCTYPE_ID);
    });
  });
}
