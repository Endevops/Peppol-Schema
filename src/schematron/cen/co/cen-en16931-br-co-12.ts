import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, fieldIssue, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-12',
  level: 'fatal',
  message: 'Sum of charges on document level (BT-108) = Σ Document level charge amount (BT-99).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo12(document: PeppolDocument) {
  const chargeTotalAmount = document.legalMonetaryTotal.chargeTotalAmount;
  const components = (document.allowanceCharges ?? []).flatMap((allowanceCharge, index) => {
    if (!allowanceCharge.chargeIndicator) {
      return [];
    }
    return [{ actual: allowanceCharge.amount.value, path: `allowanceCharges[${index}].amount.value` }];
  });
  if (chargeTotalAmount === undefined) {
    if (components.length === 0) {
      return [];
    }
    const expected = components.reduce((sum, component) => sum + component.actual, 0);
    return [
      fieldIssue('legalMonetaryTotal.chargeTotalAmount.value', expected, null),
      ...components.map(component => fieldIssue(component.path, null, component.actual)),
    ];
  }
  return sumFieldIssues({
    aggregate: { actual: chargeTotalAmount.value, path: 'legalMonetaryTotal.chargeTotalAmount.value' },
    components,
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo12 = schematronRule(rule, evaluateCenEn16931BrCo12);
