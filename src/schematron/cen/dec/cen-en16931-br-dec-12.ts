import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-12',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total amount without VAT (BT-109) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec12(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.taxExclusiveAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.taxExclusiveAmount.value);
  return passed;
}

export const validateCenEn16931BrDec12 = schematronRule(rule, evaluateCenEn16931BrDec12);
