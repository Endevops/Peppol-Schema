import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-10',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Sum of allowanced on document level (BT-107) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec10(document: PeppolDocument): boolean {
  const passed = !document.legalMonetaryTotal.allowanceTotalAmount || hasMaxTwoDecimals(document.legalMonetaryTotal.allowanceTotalAmount.value);
  return passed;
}

export const validateCenEn16931BrDec10 = schematronRule(rule, evaluateCenEn16931BrDec10);
