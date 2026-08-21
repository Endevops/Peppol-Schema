import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-48',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall have a VAT category rate (BT-119), except if the Invoice is not subject to VAT.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br48(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxCategory.percent === 'number' || st.taxCategory.id === 'O')
  );
  return schematronResult(rule, passed);
}
