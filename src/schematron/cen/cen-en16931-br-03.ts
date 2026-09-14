import { Predicate } from 'effect';

import type { PeppolDocument } from '#/schemas/peppol-document-schema.ts';
import type { SchematronRule } from '#/schematron/helpers.ts';

import { schematronRule } from '#/schematron/helpers.ts';

const rule = {
  id: 'CEN-EN16931-BR-03',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice issue date (BT-2).',
} as const satisfies SchematronRule;

function evaluateCenEn16931Br03(document: PeppolDocument): boolean {
  const passed = Predicate.hasProperty(document, 'issueDate') && Predicate.isTruthy(document.issueDate);
  return passed;
}

export const validateCenEn16931Br03 = schematronRule(rule, evaluateCenEn16931Br03);
