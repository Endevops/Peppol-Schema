import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-14',
  level: 'fatal',
  message: 'An Invoice shall have the Invoice total amount with VAT (BT-112).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br14(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.legalMonetaryTotal.taxInclusiveAmount === 'object' && document.legalMonetaryTotal.taxInclusiveAmount !== null;
  return schematronResult(rule, passed);
}
