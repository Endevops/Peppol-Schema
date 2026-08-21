import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'CEN-EN16931-BR-08',
  level: 'fatal',
  message: 'An Invoice shall contain the Seller postal address.',
} as const satisfies SchematronRule;

export function validateCenEn16931Br08(document: PeppolDocument): SchematronRuleResult {
  const passed = typeof document.accountingSupplierParty.postalAddress === 'object' && document.accountingSupplierParty.postalAddress !== null;
  return schematronResult(rule, passed);
}
