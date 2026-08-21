import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { amountsEqual, round2, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-14',
  level: 'fatal',
  message: 'Invoice total VAT amount (BT-110) = Σ VAT category tax amount (BT-117).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo14(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(
    total =>
      (total.taxSubtotals?.length ?? 0) === 0 ||
      amountsEqual(round2(total.taxAmount.value), round2((total.taxSubtotals ?? []).reduce((sum, st) => sum + st.taxAmount.value, 0)))
  );
  return schematronResult(rule, passed);
}
