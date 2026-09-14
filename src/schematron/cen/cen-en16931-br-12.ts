import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-12',
  level: 'fatal',
  message: 'An Invoice shall have the Sum of Invoice line net amount (BT-106).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br12(document: PeppolDocument): boolean {
  const passed = typeof document.legalMonetaryTotal.lineExtensionAmount === 'object' && document.legalMonetaryTotal.lineExtensionAmount !== null;
  return passed;
}

export const validateCenEn16931Br12 = schematronRule(rule, evaluateCenEn16931Br12);
