import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-22',
  level: 'fatal',
  message:
    'Each Document level charge (BG-21) shall contain a Document level charge reason (BT-104) or a Document level charge reason code (BT-105), or both.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo22(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string');
  return schematronResult(rule, passed);
}
