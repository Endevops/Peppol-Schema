import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-02',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice number (BT-1).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br02(document: PeppolDocument): boolean {
  const passed = typeof document.id === 'string' && document.id.trim() !== '';
  return passed;
}

export const validateCenEn16931Br02 = schematronRule(rule, evaluateCenEn16931Br02);
