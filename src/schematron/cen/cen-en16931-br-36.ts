import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-36',
  level: 'fatal',
  message: 'Each Document level charge (BG-21) shall have a Document level charge amount (BT-99).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br36(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? []).filter(ac => ac.chargeIndicator).every(ac => typeof ac.amount === 'object' && ac.amount !== null);
  return schematronResult(rule, passed);
}
