import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyPeriodEndAfterStart, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-29',
  level: 'fatal',
  message:
    'If both Invoicing period start date (BT-73) and Invoicing period end date (BT-74) are given then the Invoicing period end date (BT-74) shall be later or equal to the Invoicing period start date (BT-73).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br29(document: PeppolDocument): boolean {
  const passed = everyPeriodEndAfterStart(document);
  return passed;
}

export const validateCenEn16931Br29 = schematronRule(rule, evaluateCenEn16931Br29);
