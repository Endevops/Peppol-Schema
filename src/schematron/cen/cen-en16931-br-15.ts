import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-15',
  level: 'fatal',
  message: 'An Invoice shall have the Amount due for payment (BT-115).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br15(document: PeppolDocument): boolean {
  const passed = typeof document.legalMonetaryTotal.payableAmount === 'object' && document.legalMonetaryTotal.payableAmount !== null;
  return passed;
}

export const validateCenEn16931Br15 = schematronRule(rule, evaluateCenEn16931Br15);
