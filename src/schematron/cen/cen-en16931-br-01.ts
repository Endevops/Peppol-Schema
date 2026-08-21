import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-01',
  level: 'fatal',
  message: 'An Invoice shall have a Specification identifier (BT-24).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br01(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.customizationId === 'string' && document.customizationId.trim() !== '';
  return schematronResult(rule, passed);
}
