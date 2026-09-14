import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

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
