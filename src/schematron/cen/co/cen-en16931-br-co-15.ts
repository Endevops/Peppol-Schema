import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-15',
  level: 'fatal',
  message: 'Invoice total amount with VAT (BT-112) = Invoice total amount without VAT (BT-109) + Invoice total VAT amount (BT-110).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo15(document: PeppolDocument): boolean {
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
  return passed;
}

export const validateCenEn16931BrCo15 = schematronRule(rule, evaluateCenEn16931BrCo15);
