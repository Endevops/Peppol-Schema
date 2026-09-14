import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-16',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Paid amount (BT-113) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec16(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.prepaidAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.prepaidAmount.value);
  return passed;
}

export const validateCenEn16931BrDec16 = schematronRule(rule, evaluateCenEn16931BrDec16);
