import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyPeriodHasDateOrDescriptionCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-19',
  level: 'fatal',
  message:
    'If Invoicing period (BG-14) is used, the Invoicing period start date (BT-73) or the Invoicing period end date (BT-74) shall be filled, or both.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo19(document: PeppolDocument): SchematronRuleResult {
  const passed = everyPeriodHasDateOrDescriptionCode(document);
  return schematronResult(rule, passed);
}
