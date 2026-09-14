import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-13',
  level: 'fatal',
  message: 'An Invoice shall have the Invoice total amount without VAT (BT-109).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br13(document: PeppolDocument): boolean {
  const passed = typeof document.legalMonetaryTotal.taxExclusiveAmount === 'object' && document.legalMonetaryTotal.taxExclusiveAmount !== null;
  return passed;
}

export const validateCenEn16931Br13 = schematronRule(rule, evaluateCenEn16931Br13);
