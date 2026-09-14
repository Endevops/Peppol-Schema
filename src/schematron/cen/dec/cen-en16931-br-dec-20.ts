import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-20',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the VAT category tax amount (BT-117) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec20(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => hasMaxTwoDecimals(st.taxAmount.value)));
  return passed;
}

export const validateCenEn16931BrDec20 = schematronRule(rule, evaluateCenEn16931BrDec20);
