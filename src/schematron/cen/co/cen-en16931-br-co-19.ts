import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { everyPeriodHasDateOrDescriptionCode, schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-19',
  level: 'fatal',
  message:
    'If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.',
} as const satisfies SchematronRule;

function evaluateCenEn16931BrCo19(document: PeppolDocument): boolean {
  const passed = everyPeriodHasDateOrDescriptionCode(document);
  return passed;
}

export const validateCenEn16931BrCo19 = schematronRule(rule, evaluateCenEn16931BrCo19);
