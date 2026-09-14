import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { amountsEqual, round2, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-CO-14',
  level: 'fatal',
  message: 'Invoice total VAT amount (BT-110) = Σ VAT category tax amount (BT-117).',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo14(document: PeppolDocument): boolean {
  const passed = document.taxTotals.every(
    total =>
      (total.taxSubtotals?.length ?? 0) === 0 ||
      amountsEqual(round2(total.taxAmount.value), round2((total.taxSubtotals ?? []).reduce((sum, st) => sum + st.taxAmount.value, 0)))
  );
  return passed;
}

export const validateCenEn16931BrCo14 = schematronRule(rule, evaluateCenEn16931BrCo14);
