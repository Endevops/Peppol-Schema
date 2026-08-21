import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-12',
  level: 'fatal',
  message: 'Sum of charges on document level (BT-108) = Σ Document level charge amount (BT-99).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo12(document: PeppolDocument): SchematronRuleResult {
  const passed = (() => {
    const charges = (document.allowanceCharges ?? []).filter(ac => ac.chargeIndicator);
    if (!document.legalMonetaryTotal.chargeTotalAmount) {
      return charges.length === 0;
    }
    return amountsEqual(
      round2(document.legalMonetaryTotal.chargeTotalAmount.value),
      round2(charges.reduce((sum, ac) => sum + (ac.amount?.value ?? 0), 0))
    );
  })();
  return schematronResult(rule, passed);
}
