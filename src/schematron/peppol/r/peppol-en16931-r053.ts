import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R053',
  level: 'fatal',
  message: 'Only one tax total with tax subtotals MUST be provided.',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R053(document: PeppolDocument): boolean {
  const withSubtotals = document.taxTotals.filter(total => (total.taxSubtotals?.length ?? 0) > 0);
  return withSubtotals.length === 1;
}

export const validatePeppolEn16931R053 = schematronRule(rule, evaluatePeppolEn16931R053);
