import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-02',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice number (BT-1).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br02(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.id === 'string' && document.id.trim() !== '';
  return schematronResult(rule, passed);
}
