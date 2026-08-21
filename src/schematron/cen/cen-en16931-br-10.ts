import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-10',
  level: 'fatal',
  message: 'An Invoice shall contain the Buyer postal address (BG-8).',
} as const satisfies SchematronRule;

export function validateCenEn16931Br10(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.accountingCustomerParty.postalAddress === 'object' && document.accountingCustomerParty.postalAddress !== null;
  return schematronResult(rule, passed);
}
