import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-12',
  level: 'fatal',
  message: 'Sum of charges on document level (BT-108) = Σ Document level charge amount (BT-99).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo12(document: PeppolDocument): boolean {
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
  return passed;
}

export const validateCenEn16931BrCo12 = schematronRule(rule, evaluateCenEn16931BrCo12);
