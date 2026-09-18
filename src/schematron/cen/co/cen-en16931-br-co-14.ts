import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-14',
  level: 'fatal',
  message: 'Invoice total VAT amount (BT-110) = Σ VAT category tax amount (BT-117).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo14(document: PeppolDocument) {
  return document.taxTotals.flatMap((taxTotal, taxTotalIndex) => {
    if ((taxTotal.taxSubtotals?.length ?? 0) === 0) {
      return [];
    }
    return sumFieldIssues({
      aggregate: { actual: taxTotal.taxAmount.value, path: `taxTotals[${taxTotalIndex}].taxAmount.value` },
      components: (taxTotal.taxSubtotals ?? []).map((subtotal, subtotalIndex) => ({
        actual: subtotal.taxAmount.value,
        contribution: subtotal.taxAmount.value,
        path: `taxTotals[${taxTotalIndex}].taxSubtotals[${subtotalIndex}].taxAmount.value`,
      })),
      isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
    });
  });
}

export const validateCenEn16931BrCo14 = schematronRule(rule, evaluateCenEn16931BrCo14);
