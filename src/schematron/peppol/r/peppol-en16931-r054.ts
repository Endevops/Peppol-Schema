import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R054',
  level: 'fatal',
  message: 'Only one tax total without tax subtotals MUST be provided when tax currency code is provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R054(document: PeppolDocument): SchematronRuleResult {
  const withoutSubtotals = document.taxTotals.filter(total => (total.taxSubtotals?.length ?? 0) === 0);
  const expected = document.taxCurrencyCode ? 1 : 0;
  return schematronResult(rule, withoutSubtotals.length === expected);
}
