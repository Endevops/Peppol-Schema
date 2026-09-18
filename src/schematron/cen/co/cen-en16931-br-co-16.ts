import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-16',
  level: 'fatal',
  message: 'Amount due for payment (BT-115) = Invoice total amount with VAT (BT-112) -Paid amount (BT-113) +Rounding amount (BT-114).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo16(document: PeppolDocument) {
  const total = document.legalMonetaryTotal;
  return sumFieldIssues({
    aggregate: { actual: total.payableAmount.value, path: 'legalMonetaryTotal.payableAmount.value' },
    components: [
      { actual: total.taxInclusiveAmount.value, contribution: total.taxInclusiveAmount.value, path: 'legalMonetaryTotal.taxInclusiveAmount.value' },
      { actual: total.prepaidAmount?.value, contribution: -(total.prepaidAmount?.value ?? 0), path: 'legalMonetaryTotal.prepaidAmount.value' },
      {
        actual: total.payableRoundingAmount?.value,
        contribution: total.payableRoundingAmount?.value ?? 0,
        path: 'legalMonetaryTotal.payableRoundingAmount.value',
      },
    ],
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo16 = schematronRule(rule, evaluateCenEn16931BrCo16);
