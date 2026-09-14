import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-38',
  level: 'fatal',
  message: 'Each Document level charge (BG-21) shall have a Document level charge reason (BT-104) or a Document level charge reason code (BT-105).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br38(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => ac.chargeIndicator)
    .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string');
  return passed;
}

export const validateCenEn16931Br38 = schematronRule(rule, evaluateCenEn16931Br38);
