import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-18',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Amount due for payment (BT-115) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec18(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.payableAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.payableAmount.value);
  return passed;
}

export const validateCenEn16931BrDec18 = schematronRule(rule, evaluateCenEn16931BrDec18);
