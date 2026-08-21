import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-45',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall have a VAT category taxable amount (BT-116).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br45(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxableAmount === 'object' && st.taxableAmount !== null)
  );
  return schematronResult(rule, passed);
}
