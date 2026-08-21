import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'GR-R-002',
  level: 'fatal',
  message:
    'Greek Suppliers must provide their full name as they are registered in the Greek Business Registry (G.E.MH.) as a legal entity or in the Tax Registry as a natural person ',
} as const satisfies SchematronRule;

export function validateGrR002(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'GR' && getSupplierCountry(document) !== 'EL') {
    return schematronResult(rule, true);
  }
  const partyName = document.accountingSupplierParty.partyName?.name;
  return schematronResult(rule, typeof partyName === 'string' && partyName.length > 0);
}
