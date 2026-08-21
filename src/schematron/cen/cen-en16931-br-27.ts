import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-27',
  level: 'fatal',
  message: 'The Item net price (BT-146) shall NOT be negative.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br27(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => line.price.priceAmount.value >= 0);
  return schematronResult(rule, passed);
}
