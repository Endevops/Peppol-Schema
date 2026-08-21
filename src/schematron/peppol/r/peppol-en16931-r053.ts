import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R053',
  level: 'fatal',
  message: 'Only one tax total with tax subtotals MUST be provided.',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R053(document: PeppolDocument): SchematronRuleResult {
  const withSubtotals = document.taxTotals.filter(total => (total.taxSubtotals?.length ?? 0) > 0);
  return schematronResult(rule, withSubtotals.length === 1);
}
