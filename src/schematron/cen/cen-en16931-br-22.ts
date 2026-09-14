import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-22',
  level: 'fatal',
  message: 'Each Invoice line (BG-25) shall have an Invoiced quantity (BT-129).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br22(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => ('invoicedQuantity' in line ? line.invoicedQuantity : line.creditedQuantity) !== undefined);
  return passed;
}

export const validateCenEn16931Br22 = schematronRule(rule, evaluateCenEn16931Br22);
