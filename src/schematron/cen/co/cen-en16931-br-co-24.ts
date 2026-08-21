import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-24',
  level: 'fatal',
  message:
    'Each Invoice line charge (BG-28) shall contain an Invoice line charge reason (BT-144) or an Invoice line charge reason code (BT-145), or both.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo24(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return schematronResult(rule, passed);
}
