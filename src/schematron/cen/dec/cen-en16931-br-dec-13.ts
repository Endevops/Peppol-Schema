import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-DEC-13',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total VAT amount (BT-110) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec13(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(
    total => total.taxAmount.currencyId !== document.documentCurrencyCode || hasMaxTwoDecimals(total.taxAmount.value)
  );
  return passed;
}

export const validateCenEn16931BrDec13 = schematronRule(rule, evaluateCenEn16931BrDec13);
