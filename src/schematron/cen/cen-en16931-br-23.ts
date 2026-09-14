import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-23',
  level: 'fatal',
  message: 'An Invoice line (BG-25) shall have an Invoiced quantity unit of measure code (BT-130).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br23(document: PeppolDocument): boolean {
  const passed = getLines(document).every(
    line => ('invoicedQuantity' in line ? line.invoicedQuantity : line.creditedQuantity)?.unitCode !== undefined
  );
  return passed;
}

export const validateCenEn16931Br23 = schematronRule(rule, evaluateCenEn16931Br23);
