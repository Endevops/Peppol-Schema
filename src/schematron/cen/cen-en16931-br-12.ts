import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-12',
  level: 'fatal',
  message: 'An Invoice shall have the Sum of Invoice line net amount (BT-106).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br12(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.legalMonetaryTotal.lineExtensionAmount === 'object' && document.legalMonetaryTotal.lineExtensionAmount !== null;
  return schematronResult(rule, passed);
}
