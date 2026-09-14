import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { getLines, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-42',
  level: 'fatal',
  message:
    'Each Invoice line allowance (BG-27) shall have an Invoice line allowance reason (BT-139) or an Invoice line allowance reason code (BT-140).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br42(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => !ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return passed;
}

export const validateCenEn16931Br42 = schematronRule(rule, evaluateCenEn16931Br42);
