import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = { id: 'GR-R-005', level: 'fatal', message: 'Greek Suppliers must provide the full name of the buyer' } as const satisfies SchematronRule;

export function validateGrR005(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const partyName = document.accountingCustomerParty.partyName?.name;
  return schematronResult(rule, typeof partyName === 'string' && partyName.length > 0);
}
