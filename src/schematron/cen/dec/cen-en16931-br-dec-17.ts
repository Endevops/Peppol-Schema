import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-17',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Rounding amount (BT-114) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec17(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.payableRoundingAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.payableRoundingAmount.value);
  return passed;
}

export const validateCenEn16931BrDec17 = schematronRule(rule, evaluateCenEn16931BrDec17);
