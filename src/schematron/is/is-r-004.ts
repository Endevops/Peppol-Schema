import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'IS-R-004',
  level: 'fatal',
  message: '[IS-R-004]-If seller and buyer are icelandic then the invoice shall contain the buyers icelandic legal identifier',
} as const satisfies SchematronRule;

export function validateIsR004(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'IS' || getCustomerCountry(document) !== 'IS') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  return schematronResult(rule, Boolean(companyId?.id) && companyId?.schemeId === '0196');
}
