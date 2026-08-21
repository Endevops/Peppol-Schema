import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-15',
  level: 'fatal',
  message: 'Invoice total amount with VAT (BT-112) = Invoice total amount without VAT (BT-109) + Invoice total VAT amount (BT-110).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo15(document: PeppolDocument): SchematronRuleResult {
  const passed = (() => {
    const taxTotal = document.taxTotals.find(total => total.taxAmount.currencyId === document.documentCurrencyCode);
    if (!taxTotal) {
      return false;
    }
    if (document.taxTotals.filter(total => total.taxAmount.currencyId === document.documentCurrencyCode).length !== 1) {
      return false;
    }
    return amountsEqual(
      round2(document.legalMonetaryTotal.taxInclusiveAmount.value),
      round2(document.legalMonetaryTotal.taxExclusiveAmount.value + taxTotal.taxAmount.value)
    );
  })();
  return schematronResult(rule, passed);
}
