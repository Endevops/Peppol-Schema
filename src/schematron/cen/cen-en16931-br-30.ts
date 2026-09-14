import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { everyPeriodEndAfterStart, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-30',
  level: 'fatal',
  message:
    'If both Invoice line period start date (BT-134) and Invoice line period end date (BT-135) are given then the Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br30(document: PeppolDocument): boolean {
  const passed = everyPeriodEndAfterStart(document);
  return passed;
}

export const validateCenEn16931Br30 = schematronRule(rule, evaluateCenEn16931Br30);
