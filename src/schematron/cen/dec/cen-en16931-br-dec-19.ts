import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-19',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the VAT category taxable amount (BT-116) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec19(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(total => (total.taxSubtotals ?? []).every(st => hasMaxTwoDecimals(st.taxableAmount.value)));
  return passed;
}

export const validateCenEn16931BrDec19 = schematronRule(rule, evaluateCenEn16931BrDec19);
