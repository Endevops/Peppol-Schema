import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'PEPPOL-EN16931-R055',
  level: 'fatal',
  message: 'Invoice total VAT amount and Invoice total VAT amount in accounting currency MUST have the same operational sign',
} as const satisfies SchematronRule;

export function validatePeppolEn16931R055(document: PeppolDocument): SchematronRuleResult {
  const taxCurrency = document.taxCurrencyCode;
  if (!taxCurrency) {
    return schematronResult(rule, true);
  }
  const documentCurrencyAmount = document.taxTotals.find(total => total.taxAmount.currencyId === document.documentCurrencyCode)?.taxAmount.value;
  const taxCurrencyAmount = document.taxTotals.find(total => total.taxAmount.currencyId === taxCurrency)?.taxAmount.value;
  if (typeof documentCurrencyAmount !== 'number' || typeof taxCurrencyAmount !== 'number') {
    return schematronResult(rule, false);
  }
  const bothNonPositive = documentCurrencyAmount <= 0 && taxCurrencyAmount <= 0;
  const bothNonNegative = documentCurrencyAmount >= 0 && taxCurrencyAmount >= 0;
  return schematronResult(rule, bothNonPositive || bothNonNegative);
}
