import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-16',
  level: 'fatal',
  message: 'Amount due for payment (BT-115) = Invoice total amount with VAT (BT-112) -Paid amount (BT-113) +Rounding amount (BT-114).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo16(document: PeppolDocument): boolean {
  const passed = (() => {
    const total = document.legalMonetaryTotal;
    const prepaid = total.prepaidAmount?.value ?? 0;
    const rounding = total.payableRoundingAmount?.value ?? 0;
    return amountsEqual(round2(total.payableAmount.value - rounding), round2(total.taxInclusiveAmount.value - prepaid));
  })();
  return passed;
}

export const validateCenEn16931BrCo16 = schematronRule(rule, evaluateCenEn16931BrCo16);
