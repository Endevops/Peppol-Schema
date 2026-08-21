import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getLines, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-23',
  level: 'fatal',
  message: 'An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br23(document: PeppolDocument): SchematronRuleResult {
  const passed = getLines(document).every(
    line => ('invoicedQuantity' in line ? line.invoicedQuantity : line.creditedQuantity)?.unitCode !== undefined
  );
  return schematronResult(rule, passed);
}
