import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-09',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of Invoice line net amount (BT-106) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec09(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.lineExtensionAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.lineExtensionAmount.value);
  return passed;
}

export const validateCenEn16931BrDec09 = schematronRule(rule, evaluateCenEn16931BrDec09);
