import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-31',
  level: 'fatal',
  message: 'Each Document level allowance (BG-20) shall have a Document level allowance amount (BT-92).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br31(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? []).filter(ac => !ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null);
  return schematronResult(rule, passed);
}
