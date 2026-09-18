import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-13',
  level: 'fatal',
  message:
    'Invoice total amount without VAT (BT-109) = Σ Invoice line net amount (BT-131) - Sum of allowances on document level (BT-107) + Sum of charges on document level (BT-108).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo13(document: PeppolDocument) {
  const total = document.legalMonetaryTotal;
  return sumFieldIssues({
    aggregate: { actual: total.taxExclusiveAmount.value, path: 'legalMonetaryTotal.taxExclusiveAmount.value' },
    components: [
      {
        actual: total.lineExtensionAmount.value,
        contribution: total.lineExtensionAmount.value,
        path: 'legalMonetaryTotal.lineExtensionAmount.value',
      },
      {
        actual: total.chargeTotalAmount?.value,
        contribution: total.chargeTotalAmount?.value ?? 0,
        path: 'legalMonetaryTotal.chargeTotalAmount.value',
      },
      {
        actual: total.allowanceTotalAmount?.value,
        contribution: -(total.allowanceTotalAmount?.value ?? 0),
        path: 'legalMonetaryTotal.allowanceTotalAmount.value',
      },
    ],
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo13 = schematronRule(rule, evaluateCenEn16931BrCo13);
