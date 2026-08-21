import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-33',
  level: 'fatal',
  message:
    'Each Document level allowance (BG-20) shall have a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br33(document: PeppolDocument): SchematronRuleResult {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator)
    .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string');
  return schematronResult(rule, passed);
}
