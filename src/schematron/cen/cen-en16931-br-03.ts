import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-03',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice issue date (BT-2).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br03(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.issueDate === 'string' && document.issueDate.trim() !== '';
  return schematronResult(rule, passed);
}
