import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-15',
  level: 'fatal',
  message: 'An Invoice shall have the Amount due for payment (BT-115).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br15(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.legalMonetaryTotal.payableAmount === 'object' && document.legalMonetaryTotal.payableAmount !== null;
  return schematronResult(rule, passed);
}
