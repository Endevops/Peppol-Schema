import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-11',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of charges on document level (BT-108) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec11(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.chargeTotalAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.chargeTotalAmount.value);
  return passed;
}

export const validateCenEn16931BrDec11 = schematronRule(rule, evaluateCenEn16931BrDec11);
