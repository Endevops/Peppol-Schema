import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-24',
  level: 'fatal',
  message:
    'Each Invoice line charge (BG-28) shall contain an Invoice line charge reason (BT-144) or an Invoice line charge reason code (BT-145), or both.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo24(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return passed;
}

export const validateCenEn16931BrCo24 = schematronRule(rule, evaluateCenEn16931BrCo24);
