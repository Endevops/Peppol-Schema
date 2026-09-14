import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-13',
  level: 'fatal',
  message:
    'Invoice total amount without VAT (BT-109) = Σ Invoice line net amount (BT-131) - Sum of allowances on document level (BT-107) + Sum of charges on document level (BT-108).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo13(document: PeppolDocument): boolean {
  const passed = (() => {
    const total = document.legalMonetaryTotal;
    const allowance = total.allowanceTotalAmount?.value ?? 0;
    const charge = total.chargeTotalAmount?.value ?? 0;
    return amountsEqual(round2(total.taxExclusiveAmount.value), round2(total.lineExtensionAmount.value + charge - allowance));
  })();
  return passed;
}

export const validateCenEn16931BrCo13 = schematronRule(rule, evaluateCenEn16931BrCo13);
