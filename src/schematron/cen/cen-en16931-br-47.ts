import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-47',
  level: 'fatal',
  message: 'Each VAT breakdown (BG-23) shall be defined through a VAT category code (BT-118).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br47(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.every(total =>
    (total.taxSubtotals ?? []).every(st => typeof st.taxCategory?.id === 'string' && st.taxCategory.taxSchemeId.id.toUpperCase() === 'VAT')
  );
  return schematronResult(rule, passed);
}
