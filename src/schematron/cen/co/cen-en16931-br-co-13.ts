import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-13',
  level: 'fatal',
  message:
    'Invoice total amount without VAT (BT-109) = Σ Invoice line net amount (BT-131) - Sum of allowances on document level (BT-107) + Sum of charges on document level (BT-108).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo13(document: PeppolDocument): SchematronRuleResult {
  const passed = (() => {
    const total = document.legalMonetaryTotal;
    const allowance = total.allowanceTotalAmount?.value ?? 0;
    const charge = total.chargeTotalAmount?.value ?? 0;
    return amountsEqual(round2(total.taxExclusiveAmount.value), round2(total.lineExtensionAmount.value + charge - allowance));
  })();
  return schematronResult(rule, passed);
}
