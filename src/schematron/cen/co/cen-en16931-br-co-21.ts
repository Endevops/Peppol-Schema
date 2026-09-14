import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-21',
  level: 'fatal',
  message:
    'Each Document level allowance (BG-20) shall contain a Document level allowance reason (BT-97) or a Document level allowance reason code (BT-98), or both.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo21(document: PeppolDocument): boolean {
  const passed = (document.allowanceCharges ?? [])
    .filter(ac => !ac.chargeIndicator)
    .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string');
  return passed;
}

export const validateCenEn16931BrCo21 = schematronRule(rule, evaluateCenEn16931BrCo21);
