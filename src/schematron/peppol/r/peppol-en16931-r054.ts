import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R054',
  level: 'fatal',
  message: 'Only one tax total without tax subtotals MUST be provided when tax currency code is provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R054(document: PeppolDocument): boolean {
  const withoutSubtotals = document.taxTotals.filter(total => (total.taxSubtotals?.length ?? 0) === 0);
  const expected = document.taxCurrencyCode ? 1 : 0;
  return withoutSubtotals.length === expected;
}

export const validatePeppolEn16931R054 = schematronRule(rule, evaluatePeppolEn16931R054);
