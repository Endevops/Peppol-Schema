import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-11',
  level: 'fatal',
  message: 'Sum of allowances on document level (BT-107) = Σ Document level allowance amount (BT-92).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo11(document: PeppolDocument): SchematronRuleResult {
  const passed = (() => {
    const allowances = (document.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator);
    if (!document.legalMonetaryTotal.allowanceTotalAmount) {
      return allowances.length === 0;
    }
    return amountsEqual(
      round2(document.legalMonetaryTotal.allowanceTotalAmount.value),
      round2(allowances.reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0))
    );
  })();
  return schematronResult(rule, passed);
}
