import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, fieldIssue, round2, schematronRule, sumFieldIssues } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-11',
  level: 'fatal',
  message: 'Sum of allowances on document level (BT-107) = Σ Document level allowance amount (BT-92).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo11(document: PeppolDocument) {
  const allowanceTotalAmount = document.legalMonetaryTotal.allowanceTotalAmount;
  const components = (document.allowanceCharges ?? []).flatMap((allowanceCharge, index) => {
    if (allowanceCharge.chargeIndicator) {
      return [];
    }
    return [{ actual: allowanceCharge.amount.value, path: `allowanceCharges[${index}].amount.value` }];
  });
  if (allowanceTotalAmount === undefined) {
    if (components.length === 0) {
      return [];
    }
    const expected = components.reduce((sum, component) => sum + component.actual, 0);
    return [
      fieldIssue('legalMonetaryTotal.allowanceTotalAmount.value', expected, null),
      ...components.map(component => fieldIssue(component.path, null, component.actual)),
    ];
  }
  return sumFieldIssues({
    aggregate: { actual: allowanceTotalAmount.value, path: 'legalMonetaryTotal.allowanceTotalAmount.value' },
    components,
    isEqual: (actual, expected) => amountsEqual(round2(actual), round2(expected)),
  });
}

export const validateCenEn16931BrCo11 = schematronRule(rule, evaluateCenEn16931BrCo11);
