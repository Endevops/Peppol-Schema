import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-13',
  level: 'fatal',
  message: 'An Invoice shall have the Invoice total amount without VAT (BT-109).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br13(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.legalMonetaryTotal.taxExclusiveAmount === 'object' && document.legalMonetaryTotal.taxExclusiveAmount !== null;
  return schematronResult(rule, passed);
}
