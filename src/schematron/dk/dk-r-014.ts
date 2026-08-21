import type { PeppolDocument } from '#/document';
import type { SchematronRule } from '#/schematron/helpers';
import type { SchematronRuleResult } from '#/schematron/types';

import { getSupplierCountry, schematronResult } from '#/schematron/helpers';

const rule = {
  id: 'DK-R-014',
  level: 'fatal',
  message:
    'For Danish Suppliers it is mandatory to specify schemeID as "0184" (DK CVR-number) when PartyLegalEntity/CompanyID is used for AccountingSupplierParty',
} as const satisfies SchematronRule;

export function validateDkR014(document: PeppolDocument): SchematronRuleResult {
  if (getSupplierCountry(document) !== 'DK') {
    return schematronResult(rule, true);
  }
  const companyId = document.accountingSupplierParty.partyLegalEntity.companyId;
  const passed = !companyId?.id || companyId.schemeId === '0184';
  return schematronResult(rule, passed);
}
