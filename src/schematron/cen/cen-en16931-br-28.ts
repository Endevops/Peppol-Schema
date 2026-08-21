import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-28',
  level: 'fatal',
  message: 'The Item gross price (BT-148) shall NOT be negative.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br28(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => !line.price.allowanceCharge?.baseAmount || line.price.allowanceCharge.baseAmount.value >= 0);
  return schematronResult(rule, passed);
}
