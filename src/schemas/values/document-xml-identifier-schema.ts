import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { documentTypesTable } from '#/values/document-type.generated';

const entries = /* @__PURE__ */ objectEntries(documentTypesTable);

export function documentXmlIdentifierSchema(error?: string) {
  return z.union(
    entries.map(([key, value]) =>
      z.object({ '#text': z.string().check(z.refine(val => value.includes(val))), '@scheme': z.string().check(z.refine(val => val === key)) })
    ),
    error ?? 'invalid Peppol document identifier'
  );
}
