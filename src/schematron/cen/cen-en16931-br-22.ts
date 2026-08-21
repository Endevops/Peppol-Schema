import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-22',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoiced quantity (BT-129).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br22(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(line => ('invoicedQuantity' in line ? line.invoicedQuantity : line.creditedQuantity) !== undefined);
  return schematronResult(rule, passed);
}
