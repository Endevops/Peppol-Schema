import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-27',
  level: 'fatal',
  message: 'The Item net price (BT-146) shall NOT be negative.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br27(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => line.price.priceAmount.value >= 0);
  return passed;
}

export const validateCenEn16931Br27 = schematronRule(rule, evaluateCenEn16931Br27);
