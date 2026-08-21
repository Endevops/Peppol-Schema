import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { everyPeriodEndAfterStart, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-30',
  level: 'fatal',
  message:
    'If both Invoice line period start date (BT-134) and Invoice line period end date (BT-135) are given then the Invoice line period end date (BT-135) shall be later or equal to the Invoice line period start date (BT-134).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br30(document: PeppolDocument): SchematronRuleResult {
  const passed = everyPeriodEndAfterStart(document);
  return schematronResult(rule, passed);
}
