import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-05',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice currency code (BT-5).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br05(document: PeppolDocument): boolean {
  const passed = typeof document.documentCurrencyCode === 'string' && document.documentCurrencyCode.trim() !== '';
  return passed;
}

export const validateCenEn16931Br05 = schematronRule(rule, evaluateCenEn16931Br05);
