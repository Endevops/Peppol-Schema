import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-44',
  level: 'fatal',
  message: 'Each Invoice line charge shall have an Invoice line charge reason or an invoice line allowance reason code.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br44(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line =>
    (line.allowanceCharges ?? [])
      .filter(ac => ac.chargeIndicator)
      .every(ac => typeof ac.allowanceChargeReason === 'string' || typeof ac.allowanceChargeReasonCode === 'string')
  );
  return passed;
}

export const validateCenEn16931Br44 = schematronRule(rule, evaluateCenEn16931Br44);
