import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-18',
  level: 'fatal',
  message: 'An Invoice shall at least have one VAT breakdown group (BG-23).',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo18(document: PeppolDocument): SchematronRuleResult {
  const passed = document.taxTotals.some(total => (total.taxSubtotals?.length ?? 0) > 0);
  return schematronResult(rule, passed);
}
