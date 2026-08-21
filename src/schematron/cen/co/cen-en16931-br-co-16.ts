import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-16',
  level: 'fatal',
  message: 'Amount due for payment (BT-115) = Invoice total amount with VAT (BT-112) -Paid amount (BT-113) +Rounding amount (BT-114).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo16(document: PeppolDocument): SchematronRuleResult {
  const passed = (() => {
    const total = document.legalMonetaryTotal;
    const prepaid = total.prepaidAmount?.value ?? 0;
    const rounding = total.payableRoundingAmount?.value ?? 0;
    return amountsEqual(round2(total.payableAmount.value - rounding), round2(total.taxInclusiveAmount.value - prepaid));
  })();
  return schematronResult(rule, passed);
}
