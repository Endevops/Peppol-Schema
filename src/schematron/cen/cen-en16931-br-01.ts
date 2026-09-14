import type { PeppolDocument } from '#/schemas/peppol-document-schema';
import type { SchematronRule } from '#/schematron/helpers';

import { schematronRule } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-01',
  level: 'fatal',
  message: 'An Invoice shall have a Specification identifier (BT-24).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br01(document: PeppolDocument): boolean {
  const passed = typeof document.customizationId === 'string' && document.customizationId.trim() !== '';
  return passed;
}

export const validateCenEn16931Br01 = schematronRule(rule, evaluateCenEn16931Br01);
