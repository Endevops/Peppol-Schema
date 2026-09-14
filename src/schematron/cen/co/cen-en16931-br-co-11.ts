import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-11',
  level: 'fatal',
  message: 'Sum of allowances on document level (BT-107) = Σ Document level allowance amount (BT-92).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo11(document: PeppolDocument): boolean {
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
  return passed;
}

export const validateCenEn16931BrCo11 = schematronRule(rule, evaluateCenEn16931BrCo11);
