import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getCustomerCountry, getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-017',
  level: 'warning',
  message:
    'For Danish Customers it is mandatory to specify schemeID as "0184" (DK CVR-number) when PartyLegalEntity/CompanyID is used for AccountingCustomerParty',
} as const satisfies SchematronRule;

export function validateDkR017(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK' || getCustomerCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingCustomerParty.partyLegalEntity.companyId;
  const passed = !companyId?.id || companyId.schemeId === '0184';
  return schematronResult(rule, passed);
}
