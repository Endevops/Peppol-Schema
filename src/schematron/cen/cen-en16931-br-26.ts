import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-26',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall contain the Item net price (BT-146).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br26(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => typeof line.price.priceAmount === 'object' && line.price.priceAmount !== null);
  return schematronResult(rule, passed);
}
