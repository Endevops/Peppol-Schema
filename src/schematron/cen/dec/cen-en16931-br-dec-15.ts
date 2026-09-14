import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { hasMaxTwoDecimals, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-DEC-15',
  level: 'fatal',
  message: 'The allowed maximum number of decimals for the Invoice total VAT amount in accounting currency (BT-111) is 2.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrDec15(document: PeppolDocument): boolean {
  const passed =
    !document.taxCurrencyCode ||
    document.taxTotals.every(total => total.taxAmount.currencyId !== document.taxCurrencyCode || hasMaxTwoDecimals(total.taxAmount.value));
  return passed;
}

export const validateCenEn16931BrDec15 = schematronRule(rule, evaluateCenEn16931BrDec15);
