import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { getLines, schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-28',
  level: 'fatal',
  message: 'The Item gross price (BT-148) shall NOT be negative.',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br28(document: PeppolDocument): boolean {
  const passed = getLines(document).every(line => !line.price.allowanceCharge?.baseAmount || line.price.allowanceCharge.baseAmount.value >= 0);
  return passed;
}

export const validateCenEn16931Br28 = schematronRule(rule, evaluateCenEn16931Br28);
