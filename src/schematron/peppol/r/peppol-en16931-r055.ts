import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'PEPPOL-EN16931-R055',
  level: 'fatal',
  message: 'Invoice total VAT amount and Invoice total VAT amount in accounting currency MUST have the same operational sign',
} as const satisfies SchematronRule;

function evaluatePeppolEn16931R055(document: PeppolDocument): boolean {
  const taxCurrency = document.taxCurrencyCode;
  if (!taxCurrency) {
    return true;
  }
  const documentCurrencyAmount = document.taxTotals.find(total => total.taxAmount.currencyId === document.documentCurrencyCode)?.taxAmount.value;
  const taxCurrencyAmount = document.taxTotals.find(total => total.taxAmount.currencyId === taxCurrency)?.taxAmount.value;
  if (typeof documentCurrencyAmount !== 'number' || typeof taxCurrencyAmount !== 'number') {
    return false;
  }
  const bothNonPositive = documentCurrencyAmount <= 0 && taxCurrencyAmount <= 0;
  const bothNonNegative = documentCurrencyAmount >= 0 && taxCurrencyAmount >= 0;
  return bothNonPositive || bothNonNegative;
}

export const validatePeppolEn16931R055 = schematronRule(rule, evaluatePeppolEn16931R055);
