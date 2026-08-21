import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyPeriodHasDateOrDescriptionCode, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-CO-20',
  level: 'fatal',
  message:
    'If Invoice line period (BG-26) is used, the Invoice line period start date (BT-134) or the Invoice line period end date (BT-135) shall be filled, or both.',
} as const satisfies SchematronRule;

export function validateCenEn16931BrCo20(document: PeppolDocument): SchematronRuleResult {
  const passed = everyPeriodHasDateOrDescriptionCode(document);
  return schematronResult(rule, passed);
}
