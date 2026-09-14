import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-14',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total amount with VAT (BT-112) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec14(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.taxInclusiveAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.taxInclusiveAmount.value);
  return passed;
}

export const validateCenEn16931BrDec14 = schematronRule(rule, evaluateCenEn16931BrDec14);
