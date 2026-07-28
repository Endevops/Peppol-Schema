import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';
import { INVOICE_DOCTYPE_ID } from '#/constants';
import { processSchema } from '#/schemas/values/process-codes';
import { type deprecateddocumentTypes, documentTypesProcessIds, documentTypesScheme, documentTypesTable } from '#/values/document-type.generated';

/**
 * @useDeclaredType
 */
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

/**
 * @description Schema for complete peppol document types.
 *
 * @example
 *   ```
 *   busdox-docid-qns::urn:oasis:names:specification:ubl:schema:xsd:Invoice-2::Invoice##urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0::2.1
 *   ```;
 */
export function documentTypeSchema(error = 'invalid peppol document type') {
  return z
    .templateLiteral(
      [
        z.string().check(z.refine(val => entries.some(([code]) => val.startsWith(code)), { error: 'invalid document type schema' })),
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

/**
 * @description Schema that will validate that the process is valid for the given document type If no process is found for the document type, it will return a
 * schema that validates any process schema.
 */
export function processFromDocumentTypeSchema(documentType: PeppolDocumentType, error = 'invalid process type for document type') {
  const processes = documentTypesProcessIds[documentType as keyof typeof documentTypesProcessIds];
  if (!processes) {
    return processSchema(error);
  }
  return z
    .templateLiteral([z.string(), z.literal('::'), z.string()], error)
    .check(z.refine(val => processes.map(p => `${p.scheme}::${p.value}`).includes(val)));
}

/**
 * @description Schema for the scheme only part of a document type.
 *
 * @example
 *   ```
 *   busdox-docid-qns
 *   ```;
 */
export function documentTypeSchemesSchema(error?: string) {
  return z.enum(documentTypesScheme, error ?? 'invalid Peppol document type scheme');
}
/**
 * @description Schema for the value only part of a document type.
 */
export function documentTypeValuesSchema(error?: string) {
  return z.string(error ?? 'invalid Peppol document type value').check(z.refine(val => entries.flatMap(([, value]) => value).includes(val)));
}

/**
 * @description Fast-xml-parser specific schema used to validate a document identifier node.
 */
export function documentXmlIdentifierSchema(error?: string) {
  return z.union(
    entries.map(([key, value]) =>
      z.object({ '#text': z.string().check(z.refine(val => value.includes(val))), '@scheme': z.string().check(z.refine(val => val === key)) })
    ),
    error ?? 'invalid Peppol document identifier'
  );
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;
  describe('document-type', () => {
    it.fails('should not contains duplicates', () => {
      // this failed test is normal,
      // use it to see the duplicates
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
