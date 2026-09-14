import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyPeriodHasDateOrDescriptionCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-20',
  level: 'fatal',
  message:
    'If Invoice line period (BG-26) is used, the Invoice line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo20(document: PeppolDocument): boolean {
  const passed = everyPeriodHasDateOrDescriptionCode(document);
  return passed;
}

export const validateCenEn16931BrCo20 = schematronRule(rule, evaluateCenEn16931BrCo20);
