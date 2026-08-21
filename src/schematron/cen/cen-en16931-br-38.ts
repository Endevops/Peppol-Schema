import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-38',
  level: 'fatal',
  message: 'Each Document level charge (BG-21) shall have a Document level charge reason (BT-104) or a Document level charge reason code (BT-105).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br38(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string');
  return schematronResult(rule, passed);
}
