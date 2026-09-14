import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-14',
  level: 'fatal',
  message: 'An Invoice shall have the Invoice total amount with VAT (BT-112).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br14(document: PeppolDocument): boolean {
  const passed = typeof document.legalMonetaryTotal.taxInclusiveAmount === 'object' && document.legalMonetaryTotal.taxInclusiveAmount !== null;
  return passed;
}

export const validateCenEn16931Br14 = schematronRule(rule, evaluateCenEn16931Br14);
