import { objectEntries } from 'ts-extras';
import * as z from 'zod/mini';

import { documentTypesTable } from '#/values/document-type.generated';

const entries = /* @__PURE__ */ objectEntries(documentTypesTable);

export function documentTypeValuesSchema(error?: string) {
  return z.string(error ?? 'invalid Peppol document type value').check(z.refine(val => entries.flatMap(([, value]) => value).includes(val as never)));
}
