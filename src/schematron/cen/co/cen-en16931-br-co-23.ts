import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-23',
  level: 'fatal',
  message:
    'Each Invoice line allowance (BG-27) shall contain an Invoice line allowance reason (BT-139) or an Invoice line allowance reason code (BT-140), or both.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo23(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => !ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return schematronResult(rule, passed);
}
