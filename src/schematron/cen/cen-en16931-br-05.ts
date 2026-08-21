import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-05',
  level: 'fatal',
  message: 'An Invoice shall have an Invoice currency code (BT-5).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br05(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.documentCurrencyCode === 'string' && document.documentCurrencyCode.trim() !== '';
  return schematronResult(rule, passed);
}
