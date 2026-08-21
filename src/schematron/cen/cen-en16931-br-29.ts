import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyPeriodEndAfterStart, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-29',
  level: 'fatal',
  message:
    'If both Invoicing period start date (BT-73) and Invoicing period end date (BT-74) are given then the Invoicing period end date (BT-74) shall be later or equal to the Invoicing period start date (BT-73).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br29(document: PeppolDocument): SchematronRuleResult {
  const passed = everyPeriodEndAfterStart(document);
  return schematronResult(rule, passed);
}
